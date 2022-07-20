let departmentsArray = [["Pablo", "Enrique", "Josh", "Juan", "Gonzalo"], ["Michael", "Alexander", "Mikel", "Ariel"], ["John", "Julia", "Brad", "George"]]

function namesSorter (departmentsArray) {
    let arr = [];
    for (let i = 0; i < departmentsArray.length; i++) {
        for (let j = 0; j < departmentsArray.length; j++) {
        arr.push(departmentsArray[i][j])
    }
}

    arr.sort((a, b) => {
        if (a.length > b.length) {return 1}
        if (a.length < b.length) {return -1}
        if (a.length === b.length) {
            let name1 = a.toLowerCase();
            let name2 = b.toLowerCase();
            console.log(name1, name2)
            return name1 < name2 ? -1 : 1
        }
    })
    return arr;
  }

  
namesSorter(departmentsArray)