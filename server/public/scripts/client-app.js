$(document).ready(function() {
    // getBooks();
    getOwner();
    getJoin();
    // appendRegistry();

    // add a book
    $('#owner-submit').on('click', postOwner);
    $('#pet-submit').on('click', postPet);

    $('#registry').on('click', '.update', putPet);
    $('#registry').on('click', '.delete', deletePet);
    // $('#genre-select-box').on('click', '.genre-submit', getGenre);
});

//=================
/**
 * Retrieve books from server and append to DOM
 */
// function getBooks() {
//     $.ajax({
//         type: 'GET',
//         url: '/books',
//         success: function(books) {
//             console.log('GET /books returns:', books);
//             appendBook(books);
//
//         },
//
//         error: function(response) {
//             console.log('GET /books fail. No books could be retrieved!');
//         },
//     });
// }
//
function appendRegistry(entry) {
    var $el = $('<div></div>');
    var entryProperties = ['name', 'breed', 'color'];
    console.log('entry is: ', entry);
    $('#registry').append('<input id="ownerName disabledInput" type="text" value="' + entry.first_name + ' ' + entry.last_name + '"></label>');

    entryProperties.forEach(function(property) {

        // if (property == '')
        // if (property == 'published') {           
        //     book[property] = new Date(book[property]);
        //
        //                  //get strings for month/day/year
        //                 
        //     var month = book[property].getUTCMonth(book[property]) + 1; //months from 1-12
        //                 
        //     var day = book[property].getUTCDate(book[property]);            
        //     var year = book[property].getUTCFullYear(book[property]);
        //
        //                  //catcatcanate into one string month/day/year and set to book.published as text
        //                 
        //     book[property] = month + "/" + day + "/" + year;          
        // }
        var inputType = 'text';
        var $input = $('<input type="' + inputType + '" id="' + property + '" name="' + property + '" />');
        $input.val(entry[property]);
        $el.append($input);
    });

    $el.data('petId', entry.id);
    console.log('pet id', entry.id);

    $el.append('<button class="update">Update</button>');
    $el.append('<button class="delete">Delete</button>');
    $el.append('<button class="checkinout">Check In/Out</button>');

    $('#registry').append($el);
}
//===================
/**
 * Add a new book to the database and refresh the DOM
 */
function postOwner(event) {
    event.preventDefault();

    var owner = {};

    $.each($('#owner-form').serializeArray(), function(i, field) {
        owner[field.name] = field.value;
    });

    $.ajax({
        type: 'POST',
        url: '/owner',
        data: owner,
        success: function() {
            console.log('POST /owner works!');
            $('#owner-list').empty();
            // getBooks();
        },

        error: function(response) {
            console.log('POST /books does not work...');
        },
    });
}

function postPet(event) {
    event.preventDefault();

    var pet = {};
    var ownerId = $('#selectedOwner').val();
    pet.owner_id = ownerId;
    console.log(ownerId);

    $.each($('#pets-form').serializeArray(), function(i, field) {
        pet[field.name] = field.value;
    });
    console.log(pet);
    $.ajax({
        type: 'POST',
        url: '/pet',
        data: pet,
        success: function() {
            console.log('POST /owner works!');
            // $('#owner-list').empty();
            // getBooks();
        },

        error: function(response) {
            console.log('POST /pet does not work...');
        },
    });
}

function getOwner() {
    $.ajax({
        type: 'GET',
        url: '/owner',
        success: function(owners) {
            console.log('GET /owner returns:', owners);
            // appendOwner(owners);

            owners.forEach(function(owner) {

                $('#selectedOwner').append('<option value="' + owner.id +
                    '">' + owner.first_name + ' ' + owner.last_name + '</option>');
            })
        },

        error: function(response) {
            console.log('GET /owner fail. No owners could be retrieved!');
        },
    });
}



function getJoin() {
    $.ajax({
        type: 'GET',
        url: '/joiner',
        success: function(entries) {
            console.log('GET /joiner returns:', entries);
            // appendOwner(owners);

            entries.forEach(function(entry) {
                console.log('entry', entry);
                appendRegistry(entry);
                // build the append here
                // $('#selectedOwner').append('<option value="' + owner.id +
                //     '">' + owner.first_name + ' ' + owner.last_name + '</option>');
                // entryReturned = entry;
                // return entryReturned;
            })
        },

        error: function(response) {
            console.log('GET /joiner fail. No joins could be retrieved!');
        },
    });
}




//select the 'selector' and append to it <options> with the get data


function putPet() {
    var pet = {};
    var inputs = $(this).parent().children().serializeArray();
    $.each(inputs, function(i, field) {
        pet[field.name] = field.value;
    });

    console.log('pet we are putting:', pet);

    var petId = $(this).parent().data('petId');

    $.ajax({
        type: 'PUT',
        url: '/pet/' + petId,
        data: pet,
        success: function() {
            $('#registry').empty();
            getJoin();
        },
        error: function() {
            console.log('No Put for yo critters' + petId);
        },
    });
}

function deletePet() {
    var petId = $(this).parent().data('petId');

    $.ajax({
        type: 'DELETE',
        url: '/pet/' + petId,
        success: function() {
            $('#registry').empty();
            console.log('DELETE success!!');
            // getJoin();
        },
        error: function() {
            console.log('DELETE aint working yo');
        }
    });
}
//
// function getGenre() {
//     event.preventDefault();
//     var genreSelected = $('#selectedGenre').val();
//     console.log('this is from the getGenre and your book Id is:', genreSelected);
//
//     $.ajax({
//         type: 'GET',
//         url: '/books/' + genreSelected,
//         data: genreSelected,
//         success: function(books) {
//             $('#book-list').empty();
//             appendBook(books);
//             console.log('You somehow got to the server! here is your genre:', genreSelected);
//         },
//         error: function() {
//             console.log('whomp whomp, that genre stuff did not work, try again');
//         }
//     });
// };
