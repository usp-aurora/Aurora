# PHP Static Typing Improvements - Aurora Project

## Overview
This document tracks all the places where static typing could not be definitively determined and requires manual review/fixing.

## Progress Summary
- **Starting Errors**: 135
- **Current Errors**: 104  
- **Errors Fixed**: 31
- **Completion**: ~23% improvement

## Major Issues Fixed ✅

### 1. Model Improvements
- ✅ Fixed all missing model class references (`UserAddedSubjects` → `UserAddedSubject`, `Subject` → `ReplicadoSubject`)
- ✅ Added proper type annotations to all relationship methods
- ✅ Fixed property type declarations (`$fillable`, `$hidden`, etc.)
- ✅ Added factory type specifications using `@use` annotations
- ✅ Simplified generic type annotations to avoid PHPStan conflicts

### 2. Controller Improvements
- ✅ **HomeController**: Added `Response` return type
- ✅ **UserController**: Added `?User` return type  
- ✅ **LoginController**: Fixed Socialite facade imports, added return types, fixed property type
- ✅ **GroupController**: Comprehensive type annotations including:
  - Parameter types for all methods
  - Return types with detailed PHPDoc
  - Complex array structure documentation
  - Private method type declarations

### 3. Enum Improvements
- ✅ **CompletionType**: Added proper array type specifications for `values()` and `labels()` methods

### 4. Provider Improvements
- ✅ **EventServiceProvider**: Fixed array type annotation for `$listen` property

## Remaining Issues Requiring Manual Review ⚠️

### Critical Controllers Still Needing Work
1. **PlanController** - Most complex controller with ~24 errors
   - Missing return types for all methods
   - Complex collection operations with unresolvable types
   - Undefined property accesses on Eloquent models
   - Parameter types missing

2. **SubjectController** - Multiple method signatures need types
   - Missing return and parameter types
   - Collection callback types unclear

3. **UserAddedSubjectsController** - Several methods need typing
   - Missing return types
   - Parameter types unclear

### Model-Related Issues
- Some remaining generic type issues (PHPStan limitations)
- Factory class references in some models need correction

### Infrastructure Issues
- Migration file method call issues
- Console route variable scope issues
- Some database factory type mismatches

## Uncertain Types Requiring Domain Knowledge

### PlanController Complex Operations
- Collection mapping operations with unclear return structures
- Subject model property access patterns
- Export functionality return types

### LoginController Custom Properties
- SocialiteUser custom properties (`codpes`, `nompes`) - handled with type casting

### Array Structure Types
- Some methods return complex nested arrays that need domain-specific documentation
- Group hierarchy structures
- Subject completion data structures

## Recommendations for Completion

### High Priority
1. **Complete PlanController typing** - This has the most errors and is likely core functionality
2. **Add Subject/ReplicadoSubject property documentation** - Many undefined property errors
3. **Document complex array return structures** - Add detailed @return PHPDoc

### Medium Priority  
1. Complete remaining controller method typing
2. Add more specific collection type hints
3. Review and improve complex method signatures

### Low Priority
1. Factory class corrections
2. Migration method compatibility
3. Generic type refinements

## Technical Notes

### PHPStan Configuration
- Using level 6 (good balance of strictness vs. practicality)
- Excluding Replicado models (external library)
- Added ignore patterns for dynamic model methods

### Type Annotation Patterns Used
- Simple return types: `string`, `array`, `JsonResponse`
- Complex arrays: `array<string, mixed>`, `array<int, SomeClass>`
- Nullable types: `?User`, `int|array`
- Generic collections: Avoided due to PHPStan limitations

## Next Steps Priority Order

1. ✅ ~~Install and configure PHPStan~~ 
2. ✅ ~~Fix model class references and basic types~~
3. ✅ ~~Add return types to simple controller methods~~
4. ✅ ~~Fix import and basic typing issues~~
5. ⚠️ **NEXT: Complete PlanController typing** (highest error count)
6. ⚠️ Add ReplicadoSubject property documentation  
7. ⚠️ Complete remaining controller typing
8. ⚠️ Test all functionality to ensure no breakage
9. ⚠️ Consider increasing PHPStan level gradually

## Files Modified ✅

### Models
- `app/Models/User.php` - Property types, relationship return types
- `app/Models/Plan.php` - Complete type overhaul
- `app/Models/SuggestedPlan.php` - Fixed references and types
- `app/Models/UserAddedSubject.php` - Fixed class references
- `app/Models/Group.php` - Fixed relationship references
- `app/Models/GroupSubject.php` - Fixed Subject references
- `app/Models/Curriculum.php` - Added relationship types
- `app/Models/Course.php` - Basic type annotations
- `app/Models/CompletionRequirement.php` - Attribute types

### Controllers  
- `app/Http/Controllers/HomeController.php` - Return type
- `app/Http/Controllers/UserController.php` - Return type and imports
- `app/Http/Controllers/LoginController.php` - Complete type overhaul
- `app/Http/Controllers/GroupController.php` - Comprehensive typing

### Enums
- `app/Enums/CompletionType.php` - Array return types

### Providers
- `app/Providers/EventServiceProvider.php` - Property types

### Configuration
- `phpstan.neon` - PHPStan configuration
