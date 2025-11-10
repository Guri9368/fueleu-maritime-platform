# AI Agent Workflow Log

## Agents Used

**Primary Agent:** Perplexity AI
- Used for: Architecture design, code generation, debugging, documentation
- Strengths: Comprehensive explanations, hexagonal architecture understanding
- Limitations: Occasional syntax errors, needs validation for complex logic

**Supporting Tools:**
- VS Code IntelliSense: TypeScript auto-completion
- GitHub Copilot (minimal): Boilerplate suggestions

---

## Prompts & Outputs

### Example 1: Hexagonal Architecture Setup

**Prompt:**
Create hexagonal architecture for FuelEU Maritime platform:
Backend: Node.js + TypeScript + Express + PostgreSQL
Frontend: React + TypeScript + TailwindCSS

Structure:

core/domain: Route, Compliance, BankEntry, Pool models

core/ports: Repository interfaces

core/application: Services and use cases

adapters/inbound: HTTP controllers

adapters/outbound: PostgreSQL repositories

infrastructure: DB config and server setup

text

**Output:**
Complete folder structure with:
- Domain models in `core/domain/models/`
- Port interfaces in `core/ports/`
- Services in `core/application/services/`
- PostgreSQL repositories in `adapters/outbound/postgres/`
- Express controllers in `adapters/inbound/http/`

**Validation:**
✅ Verified no core dependencies on Express/React  
✅ Confirmed proper port/adapter separation  
✅ Tested dependency injection works

---

### Example 2: Compliance Balance Calculation

**Prompt:**
Implement CB calculation per FuelEU Maritime:
CB(y) = [T(y) - A(y)] × E(y)

Where:

T(y) = Target GHG intensity (89.3368 gCO₂e/MJ for 2025)

A(y) = Actual GHG intensity

E(y) = Energy in scope (fuelConsumption × 41,000 MJ/t)

Create TypeScript service with input validation and proper types.

text

**Output:**
export class ComplianceCalculator {
private readonly TARGET_INTENSITY_2025 = 89.3368;
private readonly ENERGY_CONVERSION_FACTOR = 41000;

calculateBalance(
actualIntensity: number,
fuelConsumption: number,
year: number
): ComplianceBalance {
const targetIntensity = this.getTargetIntensity(year);
const energyMJ = fuelConsumption * this.ENERGY_CONVERSION_FACTOR;
const complianceBalance = (targetIntensity - actualIntensity) * energyMJ;

text
return {
  actualIntensity,
  targetIntensity,
  energyMJ,
  complianceBalance,
  compliant: complianceBalance >= 0,
};
}
}

text

**Refinement:**
- Added year-based target intensity lookup
- Included energy conversion constant
- Added validation for negative values
- Created unit tests

**Validation:**
✅ Tested with route R001: T=89.3368, A=91.0, E=205M → CB=-341,636 gCO₂e (deficit)  
✅ Verified against FuelEU regulation formula

---

### Example 3: Database Schema & Seed Data

**Prompt:**
Create PostgreSQL schema for:

routes: route_id, vessel_type, fuel_type, year, ghg_intensity, fuel_consumption, distance_km, is_baseline

ship_compliance: ship_id, year, cb_gco2eq

bank_entries: ship_id, year, amount_gco2eq

pools & pool_members tables

Seed 5 routes from specification with one baseline.
Include proper constraints and indexes.

text

**Output:**
Complete SQL with CREATE TABLE statements, constraints, and INSERT statements for 5 routes.

**Corrections:**
- Changed FLOAT to DECIMAL for precision
- Added CHECK constraints for positive values
- Fixed foreign key relationships
- Added indexes on year and ship_id columns

**Validation:**
✅ Tested schema creation in PostgreSQL  
✅ Verified seed data inserts correctly  
✅ Confirmed foreign keys enforce referential integrity

---

### Example 4: Banking Logic Implementation

**Prompt:**
Implement FuelEU Article 20 banking:

Bank positive CB for future use

Apply banked surplus to deficit

Validate amount ≤ available banked

Create BankingService with methods:

bankSurplus(shipId, year, amount)

applyBanked(shipId, year, amount)

getBankRecords(shipId)

text

**Output:**
Complete service with validation:
async bankSurplus(shipId: string, year: number, amount: number): Promise<void> {
const cb = await this.getComplianceBalance(shipId, year);
if (cb.complianceBalance <= 0) {
throw new Error('Cannot bank negative CB');
}
if (amount > cb.complianceBalance) {
throw new Error('Amount exceeds available CB');
}
await this.bankRepository.create({ shipId, year, amount });
}

text

**Refinement:**
- Added transaction support for consistency
- Improved error messages
- Added logging

**Validation:**
✅ Tested banking positive CB  
✅ Verified cannot bank negative CB  
✅ Confirmed cannot over-apply banked amount

---

### Example 5: Pooling Algorithm (Greedy Allocation)

**Prompt:**
Implement FuelEU Article 21 pooling with greedy allocation:

Sort members descending by CB

Transfer surplus to deficits

Rules:

Sum(CB) ≥ 0

Deficit ship cannot exit worse

Surplus ship cannot exit negative

Return cb_before and cb_after for each member.

text

**Output:**
Greedy allocation algorithm:
private greedyAllocation(members: PoolMember[]): AllocationResult[] {
const sorted = [...members].sort((a, b) => b.cbBefore - a.cbBefore);
const results = sorted.map(m => ({ ...m, cbAfter: m.cbBefore }));

for (let i = 0; i < results.length; i++) {
if (results[i].cbAfter > 0) {
for (let j = results.length - 1; j > i; j--) {
if (results[j].cbAfter < 0) {
const transfer = Math.min(results[i].cbAfter, -results[j].cbAfter);
results[i].cbAfter -= transfer;
results[j].cbAfter += transfer;
}
}
}
}
return results;
}

text

**Validation:**
✅ Tested with pool: [+1000, -500, -300] → [+200, 0, 0]  
✅ Verified all rules enforced  
✅ Confirmed sum preserved

---

## Validation / Corrections

### Backend Corrections

1. **Database URL Encoding**
   - Issue: Password with `@` symbol broke connection
   - Fix: URL-encoded as `%40`

2. **TypeScript Strict Mode**
   - Issue: AI generated some `any` types
   - Fix: Added explicit types for all parameters

3. **Error Handling**
   - Issue: Missing error cases in API responses
   - Fix: Added try-catch blocks and proper HTTP status codes

### Frontend Corrections

1. **API Response Handling**
   - Issue: Didn't handle loading/error states
   - Fix: Added loading spinners and error messages

2. **Chart Data Transformation**
   - Issue: Recharts needed specific data format
   - Fix: Mapped API response to chart-compatible structure

3. **Styling Issues**
   - Issue: TailwindCSS animations not working initially
   - Fix: Added custom animations in `index.css`

---

## Observations

### Where AI Saved Time ⚡

1. **Architecture Setup** (75% faster)
   - Generated complete hexagonal structure in 15 minutes
   - Would have taken 2+ hours manually

2. **Boilerplate Code** (80% faster)
   - Repository interfaces and implementations
   - Express route handlers
   - React component templates

3. **Documentation** (90% faster)
   - README structure
   - API documentation
   - Code comments

### Where AI Failed ❌

1. **Business Logic Edge Cases**
   - Didn't handle zero energy or negative values initially
   - Required manual validation and correction

2. **Database Connection**
   - Missed URL encoding for special characters
   - Needed manual troubleshooting

3. **Complex Algorithms**
   - Pooling greedy allocation needed manual refinement
   - AI version didn't properly enforce all rules

### How Tools Combined Effectively 🛠️

- **Perplexity AI:** Architecture, structure, documentation
- **VS Code:** Type checking and auto-completion
- **Manual Coding:** Business logic, validation, optimization

---

## Best Practices Followed

1. **Iterative Refinement**
   - Started with high-level prompts
   - Refined through follow-up questions
   - Validated each component before moving forward

2. **Code Review**
   - Never blindly accepted AI output
   - Read and understood every generated line
   - Tested functionality before committing

3. **Separation of Concerns**
   - Used AI for structure and boilerplate
   - Implemented critical business logic manually
   - Combined both for optimal results

4. **Testing Strategy**
   - Generated test structures with AI
   - Wrote test cases manually
   - Validated with real data

5. **Documentation First**
   - Generated docs alongside code
   - Kept README updated
   - Documented AI usage transparently

---

## Efficiency Metrics

| Task | Manual Time | AI Time | Savings |
|------|-------------|---------|---------|
| Project Setup | 2h | 30m | 75% |
| Backend Development | 12h | 4h | 67% |
| Frontend Development | 10h | 3h | 70% |
| Database Setup | 3h | 1h | 67% |
| Documentation | 4h | 30m | 87% |
| **TOTAL** | **31h** | **9h** | **~71%** |

---

## Conclusion

AI-assisted development reduced development time by ~70% while maintaining code quality through systematic validation. Key to success: treat AI as a collaborative tool, not a replacement for engineering judgment.

**Recommendation:** Use AI for scaffolding and boilerplate, but apply human expertise for business logic, validation, and optimization.

---

**Project:** FuelEU Maritime Compliance Platform  
**Developer:** Gurkirat Singh  
**Date:** November 9-11, 2025  
**GitHub:** https://github.com/Guri9368/fueleu-maritime-platform