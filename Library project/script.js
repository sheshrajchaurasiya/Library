
let arr = []
let idx = 1


class Book {
    constructor(name, issuedTo) {
        this.name = name;
        this.issuedTo = issuedTo;
    }
}
var currentdate = new Date(); 


class Display {
    add(book) {
        console.log("Adding to UI");
        // let now = currentdate.toLocaleString()
// let timeformat = now.replace(","," at")
        let obj = {
            id:idx++,
            bookName:book.name,
            issuedTo:book.issuedTo,
            dateTime:currentdate.toLocaleString().replace(","," at"),
            bookStatus:"returned"
        }
        arr.push(obj)
    }
    
    
    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    validate(book) {
        if (book.name.length < 2 || book.issuedTo.length < 2) {
            return false
        }
        else {
            return true;
        }
    }

    show(type, displayMessage) {
        let message = document.getElementById('message');
        let boldText;
        if(type==='success'){
            boldText = 'Success';
        }
        else{
            boldText = 'Error!';
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
        setTimeout(function () {
            message.innerHTML = ''
        }, 5000);
    
    }
}

// Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log('YOu have submitted library form');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
   

    let book = new Book(name, author );
    console.log(book);

    let display = new Display();

    if (display.validate(book)) {

        display.add(book);
        display.clear();
        
        renderDataInTheTable(new Array(arr[arr.length-1]))
        display.show('success', 'Your book has been successfully added')
    }
    else {
        // Show error to the user
        display.show('danger', 'Sorry you cannot add this book');
    }

    e.preventDefault();
}
