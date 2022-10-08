document.getElementById('addNewEmployeeContainer').style.display='none'
document.getElementById('employeeReviews').style.display='none'
document.getElementById('allEmployeeContainer').style.display='none'
document.getElementById('performanceReviewContaier').style.display='none'

// Listener to capture the event on page and call functions accordingly

document.addEventListener('click', function(event){
    if(event.target.id == 'showAllEmployees'){
        getAllEmployees();
    }

    else if(event.target.id=='addNewEmployee'){
        addNewEmployee();
    }

    else if(event.target.id == 'removeEmployee'){
        removeEmployee();
    }

    else if(event.target.id == 'prformanceReview'){
        openPerformanceReview();
    }

    else if(event.target.classList[0] == 'addReview'){
        let id = event.target.id.slice(10);
        createNewReview(id, document.getElementById('review-'+id).value, false )
        document.getElementById('review-'+id).value='';
    }

    else if(event.target.classList[0]=='showAll'){
        let id= event.target.id;
        showReviewsForEmployee(id.slice(8));
    }

    else if(event.target.classList[0] == 'hide'){
        let id =event.target.id;
        hideReviews(id.slice(5));
    }

    else if(event.target.classList[0] == 'submitReview'){
        let id= event.target.id.slice(13)
        createNewReview(id, document.getElementById('pendingItem-'+id).value, true);
        document.getElementById('pendingItemForm-'+id).remove();   
    }

    else if(event.target.id == 'pendingItems'){
        openPedingItems();
    }

    else if(event.target.classList[0] == 'edit'){
        let id = event.target.id;
        editEmployee(id.slice(5));
    }

    else if(event.target.classList[0] == 'removeMe'){
        let id= event.target.id;
        removeEmployee(id.slice(9))
    }

    else if(event.target.classList[0] == 'update'){
        let id= event.target.id;
        updateEmployee(id.slice(7));
    }

    else if(event.target.classList[0] == 'deleteReview'){
        deleteReview(event.target.id.slice(13));
    }

})

// To open the pending items form

function openPedingItems(){
    document.getElementById('addNewEmployeeContainer').style.display='none'
    document.getElementById('employeeReviews').style.display='none'
    document.getElementById('allEmployeeContainer').style.display='none'
    document.getElementById('performanceReviewContaier').style.display='none'
    document.getElementById('pendingItemsContainer').style.display='block'
}


// Get all employee email and Name from DB.

function getAllEmployees(){
    $.ajax({
        url :'/employee/getall',
        type:'get',
        success:function(data){
            showEmploeeDetails(data.allEmployees);
            new Noty({
                theme: 'relax',
                text: data.message,
                type: 'success',
                layout: 'topRight',
                timeout: 1500
            }).show(); 
        },
        error: function(err){
            console.log(err.responseText);
            new Noty({
                theme: 'relax',
                text: err.responseText,
                type: 'error',
                layout: 'topRight',
                timeout: 1500
            }).show(); 
        }
    })
}

//Show Employees on DOM

function showEmploeeDetails(employees){
    document.getElementById('addNewEmployeeContainer').style.display='none'
    document.getElementById('employeeReviews').style.display='none'
    document.getElementById('allEmployeeContainer').style.display='block'
    document.getElementById('pendingItemsContainer').style.display='none'
    document.getElementById('performanceReviewContaier').style.display='none'
    let container = document.getElementById('allEmployee');
    container.innerHTML='';
    
    for(let i=0;i<employees.length;i++){
        let item = document.createElement('li');
        item.innerHTML=
        `
        <div style='display:inline'><input id='name-${employees[i]._id}' class='employee-name' type='text' value = '${employees[i].name}' readonly></div>
        <div style='display:inline'><input id='email-${employees[i]._id}' class='employee-details' type='text' value='${employees[i].email}' readonly></div>
        <div style='display:inline' class='isadmin'>
            <input id='isAdmin-${employees[i]._id}' class='isadmin' type='checkbox'><label id='isAdminlabel-${employees[i]._id}' class='isadmin'>Make Admin</label>
        </div>
        <textarea cols='40' class='reviewText' id="review-${employees[i]._id}" placeholder='Write review here...'></textarea>
        <button class='addReview button' id="addReview-${employees[i]._id}">Review now</button>
        <button class='showAll button' id='showAll-${employees[i]._id}'>Show all reviews</button>
        <button class = 'removeMe button' id='removeMe-${employees[i]._id}'>Remove</button>
        <button class = 'edit button' id='edit-${employees[i]._id}'>Edit</button>
        <button class = 'update button' id='update-${employees[i]._id}'>Update</button>
        <div class='reviews-container' id='con-${employees[i]._id}'></div>
        `
        item.id = 'li-'+employees[i]._id;
        item.classList.add('empDetailsContainer')
        container.append(item);
        if(employees[i].isAdmin){
            document.getElementById('isAdmin-'+employees[i]._id).setAttribute('checked','true');
        }
    }
}


// Open form for performance review

function openPerformanceReview(){
    document.getElementById('addNewEmployeeContainer').style.display='none'
    document.getElementById('employeeReviews').style.display='none'
    document.getElementById('allEmployeeContainer').style.display='none'
    document.getElementById('performanceReviewContaier').style.display='block'
    document.getElementById('pendingItemsContainer').style.display='none'
}


//Create new review on DB
function createNewReview(id, comment, isInPending){
    $.ajax({
        type: 'post',
        url : '/review/create',
        data :{
            createdFor : id,
            comment : comment,
            isInPending:isInPending
        },
        success: function(data){
            console.log(data);
            new Noty({
                theme: 'relax',
                text: data.message,
                type: 'success',
                layout: 'topRight',
                timeout: 1500
            }).show(); 
        },
        error: function(err){
            console.log(err.responseText);
            new Noty({
                theme: 'relax',
                text: err.responseText,
                type: 'error',
                layout: 'topRight',
                timeout: 1500
            }).show(); 
        }
    })
}

// Show all reviews for an employee on DOM
function showReviewsForEmployee(id){
    document.getElementById('con-'+id).style.display='block';
    document.getElementById('addNewEmployeeContainer').style.display='none'

    //To get reviews from DB
    document.getElementById('employeeReviews').style.display='block'
    $.ajax({
        type:'get',
        url : '/employee/getMyReviews/'+id,
        success:function(data){
            new Noty({
                theme: 'relax',
                text: data.message,
                type: 'success',
                layout: 'topRight',
                timeout: 1500
            }).show(); 
            document.getElementById('con-'+id).innerHTML=''
            let details = data.data;
            console.log(details.reviews[0]);
            let heading = document.createElement('div');
            heading.innerHTML=
            `
            <div class="employee-name">Name </div>
            <div class="employee-details">Email</div>
            <div class="review-content">Review</div>
            <div class='employee-name'>Action</button></div>
            <button class = 'hide button' id='hide-${id}'>X</button>
            `
            document.getElementById('con-'+id).append(heading)
            heading.classList.add('review')
            heading.style.backgroundColor='#357a64'
            heading.style.color='white'
            for(let i=0;i<details.reviews.length;i++){
                let review = document.createElement('div');
                review.innerHTML=
                `
                <div class="employee-name">${details.reviews[i].createdBy.name}</div>
                <div class="employee-details">${details.reviews[i].createdBy.email}</div>
                <div class="review-content">${details.reviews[i].comment}</div>
                <button class='deleteReview button' id='deleteReview-${details.reviews[i]._id}' style='margin-left:8%;color:red;background-color:white;font-weight:bolder'>X</button>
                `
                document.getElementById('con-'+id).append(review);
                review.classList.add('review')
            }
           
            
        },
        error: function(err){
            console.log(err.responseText);
            new Noty({
                theme: 'relax',
                text: err.responseText,
                type: 'error',
                layout: 'topRight',
                timeout: 1500
            }).show(); 
        }
    });

    
}


// Hide reviews container

function hideReviews(id){
    document.getElementById('con-'+id).style.display='none';
    document.getElementById('hide-'+id).style.display='none'
}

// Open add new employee form
function addNewEmployee(){
    document.getElementById('addNewEmployeeContainer').style.display='block'
    document.getElementById('employeeReviews').style.display='none'
    document.getElementById('allEmployeeContainer').style.display='none'
    document.getElementById('pendingItemsContainer').style.display='none'
    document.getElementById('performanceReviewContaier').style.display='none'
}


// Remove an employee from DB
function removeEmployee(id){
    console.log(id);
    $.ajax({
        url:'/employee/'+id,
        type:'delete',
        success: function(data){
            new Noty({
                theme: 'relax',
                text: data.message,
                type: 'success',
                layout: 'topRight',
                timeout: 1500
            }).show(); 
            getAllEmployees()
        },
        error: function(err){
            new Noty({
                theme: 'relax',
                text: err.responseText,
                type: 'error',
                layout: 'topRight',
                timeout: 1500
            }).show(); 
            console.log(err.responseText);
        }
    })
}

//make fields editable to update employee and hide extra buttons

function editEmployee(id){
    document.getElementById('name-'+id).removeAttribute('readonly')
    document.getElementById('email-'+id).removeAttribute('readonly')
    document.getElementById('review-'+id).style.display='none'
    document.getElementById('addReview-'+id).style.display='none'
    document.getElementById('showAll-'+id).style.display='none'
    document.getElementById('removeMe-'+id).style.display='none'
    document.getElementById('edit-'+id).style.display='none'
    document.getElementById('update-'+id).style.display='inline-block'
    document.getElementById('isAdmin-'+id).style.display='inline-block';
    document.getElementById('isAdminlabel-'+id).style.display='inline-block';
}

//Update employee in DB

function updateEmployee(id){
    $.ajax({
        url:'/employee/update/'+id,
        type: 'POST',
        data:{
            email : document.getElementById('email-'+id).value,
            name: document.getElementById('name-'+id).value,
            isAdmin: document.getElementById('isAdmin-'+id).checked
        },

        success: function(data){
            new Noty({
                theme: 'relax',
                text: data.message,
                type: 'success',
                layout: 'topRight',
                timeout: 1500
            }).show(); 
            getAllEmployees();
        },
        error: function(err){
            new Noty({
                theme: 'relax',
                text: err.responseText,
                type: 'error',
                layout: 'topRight',
                timeout: 1500
            }).show(); 
            console.log(err.responseText);
        }
    })
}

//Delete a review from DB

function deleteReview(id){
    $.ajax({
        url:'/review/'+id,
        type:'delete',
        success: function(data){
            new Noty({
                theme: 'relax',
                text: data.message,
                type: 'success',
                layout: 'topRight',
                timeout: 1500
            }).show();
            setTimeout(function(err){
                window.location.href='/'
            }, 1000) 
            
            console.log(data);
        },
        error: function(err){
            new Noty({
                theme: 'relax',
                text: err.responseText,
                type: 'error',
                layout: 'topRight',
                timeout: 1500
            }).show(); 
            console.log(err.responseText);
        }
    })
}











