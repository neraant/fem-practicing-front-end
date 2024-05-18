function changeBackground() {
    const checkbox1 = document.getElementById('query1');
    const checkbox2 = document.getElementById('query2');
    const queryWrapper1 = document.getElementById('queryWrapper1');
    const queryWrapper2 = document.getElementById('queryWrapper2');

    console.log("click!");

    if (checkbox1.checked) {
        queryWrapper1.classList.add('checked');
    } else {
        queryWrapper1.classList.remove('checked');
    }

    if (checkbox2.checked) {
        queryWrapper2.classList.add('checked');
    } else {
        queryWrapper2.classList.remove('checked');
    }
}