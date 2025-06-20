export function localStorageIntoMap(subjectDataMap) {
    let mergedMap = { ...subjectDataMap };
    let userSubjects = [];
    try {
        userSubjects = JSON.parse(localStorage.getItem('addedUserSubjects')) || [];
    } catch (e) {
        userSubjects = [];
    }
    userSubjects.forEach(({ code, group_name }) => {
        mergedMap[code].groups = [group_name];
    });
    return mergedMap;
}

export function changeSubjectGroup(subjectDataMap, code, groupName) {
    let updatedMap = { ...subjectDataMap };
    updatedMap[code].groups = [groupName];
    return updatedMap;
}
