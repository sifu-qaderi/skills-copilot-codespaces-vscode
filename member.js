function skillsMember() {
    return {
        name: "skillsMember",
        restrict: 'E',
        templateUrl: 'app/components/member/skillsMember.html',
        scope: {
            skills: '='
        }
    };
}