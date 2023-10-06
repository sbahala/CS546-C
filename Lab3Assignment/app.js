/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need that calls your functions like the example below. 
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.

import * as authors from "./authors.js");

    try{
        const authorData = await authors.getAuthors();
        console.log (authorData);
    }catch(e){
        console.log (e);
    }
*/
import * as authors from "./authors.js";
import * as books from "./books.js";

try{
    const authorData = await authors.getAuthorById("1871e6d7-551f-41cb-9a07-08240b86c95c");
    console.log (authorData);
}catch(e){
    console.log (e);
}
try{
    const authorData = await authors.getAuthorById('7989fa5e-5617-43f7-a931-46036f9dbcff');// Error --  Author details not found for the given id: 7989fa5e-5617-43f7-a931-46036f9dbcff
    console.log (authorData);
}catch(e){
    console.log (e);
}

try{
    const authorData = await authors.searchAuthorByName("TOM"); 
    console.log (authorData);// Returns:["Tommi Banasevich","Tommy Klemenz", "Loree Tomasutti", "Rianon Tomkins"]
}catch(e){
    console.log (e);
}
try{
    const authorData = await authors.searchAuthorByName("foobar"); // Throws Error since there are no results//Error --  Author details not found for the searchTerm: foobar
    console.log (authorData);
}catch(e){
    console.log (e);
}

try{
    const authorData = await authors.getBookNames("Prisca", "Vakhonin"); 
    console.log (authorData);// Returns:["Good Thief, The", "Point, The"]

}catch(e){
    console.log (e);
}

try{
    const bookDetails = await authors.getBookNames(123,123);//Error -- Given firstName:123  or lastName:123 is not of String type
    console.log (bookDetails);
}catch(e){
    console.log (e);
}

try{
    const youngestAndOldest = await authors.youngestOldest() ;
    console.log(youngestAndOldest);
}catch(e){
    console.log (e);
}

try{
    const getDetails = await authors.sameBirthday(10, 12); //returns //[ 'Pancho Barradell', 'Lauree Henriquet' ]
    console.log(getDetails);
    //const getDetails = await authors.sameBirthday(1, 10);
}catch(e){
    console.log(e);
}
try{
    const getDetails = await authors.sameBirthday(9, 31); // Throws Error: There are not 31 days in Sept
    console.log(getDetails);
}catch(e){
    console.log(e);
}

try{
    const getBookDetails = await books.getBookById("99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e"); 
    console.log(getBookDetails);
/*// Returns: 
{   
  id: '99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e',   
  title: 'No habrá paz para los malvados',   
  genres: ['Art', 'Travel'],   
  publicationDate: '5/7/2018',   
  publisher: 'Avamm',   
  summary:   'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',   
  isbn: '520476104-7',   
  language: 'Finnish',   
  pageCount: 693,   
  price: 25.66,   
  format: ['E-Book', 'Hardcover', 'Paperback'],   
  authorId: 'f645d28a-670a-457a-b55f-a32876b8511d' 
}*/

}catch(e){
    console.log(e);
}

try{
    const getBookDetails = await books. getBookById('7989fa5e-5617-43f7-a931-46036f9dbcff');// Throws Error // Error --  The required book details are not found for the given ID: 7989fa5e-5617-43f7-a931-46036f9dbcff
    console.log(getBookDetails);
}catch(e){
    console.log(e);
}

try{
    const authNmae = await books.getAuthorName("99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e");
    console.log(authNmae);
    // Returns: 
    //"Brooke Adcock"
}catch(e){
    console.log(e);
}


try{
    const authNmae =await books.getAuthorName('7989fa5e-5617-43f7-a931-46036f9dbcff');// Throws Error//Author details are not available for the book id 7989fa5e-5617-43f7-a931-46036f9dbcff
    console.log(authNmae);
}catch(e){
    console.log(e);
}

try{
    const genre = await books.sameGenre("Memoir");
    console.log(genre);
}catch(e){
    console.log(e);
}

try{
    const genre = await books.sameGenre('foo bar');// Throws Error//Error --  No book details found for the provided genre:foo bar
    console.log(genre);
}catch(e){
    console.log(e);
}


try{
    const priceMinMax = await books.priceRange(5.99, 30);
    //console.log(priceMinMax);
}catch(e){
    console.log(e);
}

try{
    const priceMinMax = await books.priceRange("foo", 12); // Throws Error//Error -- provided min:foo price range  is not Number type
    console.log(priceMinMax);

}catch(e){
    console.log(e);
}

try{
    const bookAuthor =await books.getAllBooksWithAuthorName();
    //console.log(bookAuthor);
}catch(e){
    console.log(e);
}