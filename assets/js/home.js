document.getElementById('addNewEmployeeContainer').style.display='none'
document.getElementById('employeeReviews').style.display='none'
document.getElementById('allEmployeeContainer').style.display='none'
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

    else if(event.target.classList[0] == 'addReview'){
        let id = event.target.id;
        createNewReview(id.slice(10))
    }

    else if(event.target.classList[0]=='showAll'){
        let id= event.target.id;
        showReviewsForEmployee(id.slice(8));
    }

    else if(event.target.classList[0] == 'hide'){
        let id =event.target.id;
        hideReviews(id.slice(5));
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




function getAllEmployees(){
    $.ajax({
        url :'/employee/getall',
        type:'get',
        success:function(data){
            showEmploeeDetails(data.allEmployees);
        },
        error: function(err){
            console.log(err.responseText);
        }
    })
}

function showEmploeeDetails(employees){
    document.getElementById('addNewEmployeeContainer').style.display='none'
    document.getElementById('employeeReviews').style.display='none'
    document.getElementById('allEmployeeContainer').style.display='block'
    let container = document.getElementById('allEmployee');
    container.innerHTML='';
    for(let i=0;i<employees.length;i++){
        let item = document.createElement('li');
        item.innerHTML=
        `
        <div style='display:inline'><input id='name-${employees[i]._id}' class='employee-details' type='text' value = '${employees[i].name}' readonly></div>
        <div style='display:inline'><input id='email-${employees[i]._id}' class='employee-details' type='text' value='${employees[i].email}' readonly></div>
        <textarea class='reviewText' id="review-${employees[i]._id}"></textarea>
        <button class='addReview button' id="addReview-${employees[i]._id}">Review now</button>
        <button class='showAll button' id='showAll-${employees[i]._id}'>Show all reviews</button>
        <button class = 'removeMe button' id='removeMe-${employees[i]._id}'>Remove</button>
        <button class = 'edit button' id='edit-${employees[i]._id}'>Edit</button>
        <button class = 'update button' id='update-${employees[i]._id}'>Update</button>
        <button class = 'hide button' id='hide-${employees[i]._id}'>Hide</button>
        <div id='con-${employees[i]._id}'></div>
        `
        item.id = 'li-'+employees[i]._id;
        container.append(item);
    }
}


function createNewReview(id){
    $.ajax({
        type: 'post',
        url : '/review/create',
        data :{
            createdFor : id,
            comment : document.getElementById('review-'+id).value
        },
        success: function(data){
            console.log(data);
        },
        error: function(err){
            console.log(err.responseText);
        }
    })
}


function showReviewsForEmployee(id){
    document.getElementById('con-'+id).style.display='block';
    document.getElementById('addNewEmployeeContainer').style.display='none'
    document.getElementById('hide-'+id).style.display='inline-block'
    document.getElementById('employeeReviews').style.display='block'
    $.ajax({
        type:'get',
        url : '/employee/getMyReviews/'+id,
        success:function(data){
            document.getElementById('con-'+id).innerHTML=''
            let details = data.data;
            console.log(details.reviews[0]);
            let heading = document.createElement('div');
            heading.innerHTML=
            `
            <div class="review-details">Name </div>
            <div class="review-details">Email</div>
            <div class="review-details">Review</div>
            `
            document.getElementById('con-'+id).append(heading)
            heading.classList.add('review')
            heading.style.backgroundColor='#357a64'
            heading.style.color='white'
            for(let i=0;i<details.reviews.length;i++){
                let review = document.createElement('div');
                review.innerHTML=
                `
                <div class="review-details">${details.reviews[i].createdBy.name}</div>
                <div class="review-details">${details.reviews[i].createdBy.email}</div>
                <div class="review-content">${details.reviews[i].comment}</div>
                <button class='deleteReview' id='deleteReview-${details.reviews[i]._id}'>Delete</button>
                `
                document.getElementById('con-'+id).append(review);
                review.classList.add('review')
            }
           
            
        },
        error: function(err){
            console.log(err.responseText);
        }
    });

    
}

function hideReviews(id){
    document.getElementById('con-'+id).style.display='none';
    document.getElementById('hide-'+id).style.display='none'
}

function addNewEmployee(){
    document.getElementById('addNewEmployeeContainer').style.display='block'
    document.getElementById('employeeReviews').style.display='none'
    document.getElementById('allEmployeeContainer').style.display='none'
}


function removeEmployee(id){
    console.log(id);
    $.ajax({
        url:'/employee/'+id,
        type:'delete',
        success: function(data){
            getAllEmployees()
        },
        error: function(err){
            console.log(err.responseText);
        }
    })
}

function editEmployee(id){
    document.getElementById('name-'+id).removeAttribute('readonly')
    document.getElementById('email-'+id).removeAttribute('readonly')
    document.getElementById('review-'+id).style.display='none'
    document.getElementById('addReview-'+id).style.display='none'
    document.getElementById('showAll-'+id).style.display='none'
    document.getElementById('removeMe-'+id).style.display='none'
    document.getElementById('edit-'+id).style.display='none'
    document.getElementById('update-'+id).style.display='inline-block'
}

function updateEmployee(id){
    $.ajax({
        url:'/employee/update/'+id,
        type: 'POST',
        data:{
            email : document.getElementById('email-'+id).value,
            name: document.getElementById('name-'+id).value
        },

        success: function(data){
            console.log(data);
            getAllEmployees();
        },
        error: function(err){
            console.log(err.responseText);
        }
    })
}


function deleteReview(id){
    $.ajax({
        url:'/review/'+id,
        type:'delete',
        success: function(data){
            console.log(data);
        },
        error: function(err){
            console.log(err.responseText);
        }
    })
}











