let siteName = document.getElementById('siteName');
let siteUrl = document.getElementById('siteUrl');
let submitBtn = document.getElementById('submitBtn');
let search = document.getElementById('search');

let bookContainer = [];
let mainIndex = 0; 

if(localStorage.getItem('contents') != null){
    bookContainer = JSON.parse(localStorage.getItem('contents'));
    displayData();
}

// validateInputs
function validateInputs() {
    if(siteName.value.trim() === '' || siteUrl.value.trim() === '') {
        alert("please enter all data");
        return false;
    }
    // link start validation http:// أو https://
    if(!siteUrl.value.startsWith('http://') && !siteUrl.value.startsWith('https://')) {
        alert('please enter correct link start with http:// أو https://');
        return false;
    }
    
    return true;
}

submitBtn.onclick = function() {
    if(!validateInputs()) return;
    
    if(submitBtn.innerHTML == "UpDate") {
        submitBtn.innerHTML = "Submit";
        let content = {
            siteName: siteName.value,
            siteUrl: siteUrl.value,  
        };
        bookContainer.splice(mainIndex, 1, content);
    } else {
        let content = {
            siteName: siteName.value,
            siteUrl: siteUrl.value,  
        };
        bookContainer.push(content);
    }

    localStorage.setItem('contents', JSON.stringify(bookContainer));
    displayData();
    clearData();
};
// displayData
function displayData() {
    let data = "";
    for(let i = 0; i < bookContainer.length; i++) {
        data += `<tr>
            <td>${bookContainer[i].siteName}</td>
            <td><a href="${bookContainer[i].siteUrl}" target="_blank">${bookContainer[i].siteUrl}</a></td>
            <td><button class="btn btn-outline-primary m-2" onclick="updateData(${i})">Update</button></td>
            <td><button class="btn btn-outline-danger m-2" onclick="deleteData(${i})">Delete</button></td>
        </tr>`;
    }
    document.getElementById('tableData').innerHTML = data;
}
// deleteData
function deleteData(index) {
    if(confirm('هل أنت متأكد من حذف هذا الموقع؟')) {
        bookContainer.splice(index, 1);
        localStorage.setItem('contents', JSON.stringify(bookContainer));
        displayData();
    }
}

// searchData
function searchData() {
    let term = search.value.toLowerCase();
    let data = "";
    for(let i = 0; i < bookContainer.length; i++) {
        if(bookContainer[i].siteName.toLowerCase().includes(term)) {
            data += `<tr>
                <td>${bookContainer[i].siteName}</td>
                <td><a href="${bookContainer[i].siteUrl}" target="_blank">${bookContainer[i].siteUrl}</a></td>
                <td><button class="btn btn-outline-primary m-2" onclick="updateData(${i})">Update</button></td>
                <td><button class="btn btn-outline-danger m-2" onclick="deleteData(${i})">Delete</button></td>
            </tr>`;
        }
    }
    document.getElementById('tableData').innerHTML = data;
}
// clearData
function clearData() {
    siteName.value = "";
    siteUrl.value = "";
}
// update data
function updateData(index) {
    siteName.value = bookContainer[index].siteName;
    siteUrl.value = bookContainer[index].siteUrl;
    submitBtn.innerHTML = "UpDate"; 
    mainIndex = index;
    siteName.focus(); // نقل التركيز إلى حقل الاسم
}
// search during writing
search.addEventListener('input', searchData);