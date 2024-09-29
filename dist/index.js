"use strict";
// ศิริรุ่ง บัวพรมมี 1650706003
// สร้าง Enum สำหรับประเภทหนังสือ
var BookGenre;
(function (BookGenre) {
    BookGenre["Fiction"] = "Fiction";
    BookGenre["NonFiction"] = "Non-Fiction";
    BookGenre["Science"] = "Science";
    BookGenre["History"] = "History";
    BookGenre["Action"] = "Action";
})(BookGenre || (BookGenre = {}));
// สร้างคลาสสำหรับจัดการหนังสือ
class BookLibrary {
    constructor() {
        this.bookCollection = [];
    }
    addNewBook(book) {
        this.bookCollection.push(book);
        console.log(`${book.title} ถูกเพิ่มเข้าในห้องสมุด.`);
    }
    displayBooks() {
        console.log("รายชื่อหนังสือในห้องสมุด:");
        this.bookCollection.forEach(book => console.log(`- ${book.title} โดย ${book.author} (${book.genre}, ${book.publishedYear})`));
    }
    findBooksByField(field, value) {
        const foundBooks = this.bookCollection.filter(book => book[field] === value);
        if (foundBooks.length > 0) {
            console.log(`พบ: ${foundBooks[0].title} โดย ${foundBooks[0].author}`);
        }
        else {
            console.log("ไม่พบหนังสือตามเงื่อนไขที่กำหนด.");
        }
    }
    modifyBook(id, updatedFields) {
        const bookToUpdate = this.bookCollection.find(b => b.id === id);
        if (bookToUpdate) {
            Object.assign(bookToUpdate, updatedFields);
            console.log(`ข้อมูลหนังสือที่ id ${id} ถูกอัปเดต: ${JSON.stringify(bookToUpdate)}`);
        }
        else {
            console.log(`ไม่พบหนังสือที่ id ${id} สำหรับการอัปเดต.`);
        }
    }
    removeBook(id) {
        const initialLength = this.bookCollection.length;
        this.bookCollection = this.bookCollection.filter(book => book.id !== id);
        if (this.bookCollection.length < initialLength) {
            console.log(`หนังสือที่ id ${id} ถูกลบ.`);
        }
        else {
            console.log(`ไม่พบหนังสือที่ id ${id} สำหรับการลบ.`);
        }
    }
    saveLibraryToFile(filePath) {
        const fs = require('fs');
        fs.writeFileSync(filePath, JSON.stringify(this.bookCollection, null, 2));
        console.log(`ข้อมูลห้องสมุดถูกบันทึกลงใน ${filePath}`);
    }
    loadLibraryFromFile(filePath) {
        const fs = require('fs');
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf-8');
            this.bookCollection = JSON.parse(data);
            console.log(`ข้อมูลห้องสมุดถูกโหลดจาก ${filePath}`);
            if (this.bookCollection.length > 0) {
                console.log("หนังสือในห้องสมุดหลังจากโหลด:");
                this.displayBooks();
            }
            else {
                console.log("ไม่พบหนังสือในข้อมูลที่โหลดมา.");
            }
        }
        else {
            console.log(`ไม่พบไฟล์ ${filePath}.`);
        }
    }
}
// สร้างอ็อบเจ็กต์ของห้องสมุดและทำการทดสอบฟังก์ชัน
const myLibrary = new BookLibrary();
// เพิ่มหนังสือ
// เพิ่มหนังสือ
myLibrary.addNewBook({ title: "สิ่งมีชีวิตในห้องเรียน", author: "บัวพรม ศิริรุ่ง", genre: BookGenre.Fiction, publishedYear: 2020, available: true, id: 1 });
myLibrary.addNewBook({ title: "ประวัติศาสตร์ไทย", author: "นพพล จิตดี", genre: BookGenre.History, publishedYear: 2018, available: true, id: 2 });
myLibrary.addNewBook({ title: "วิทยาศาสตร์พื้นฐาน", author: "อัจฉรา อัจฉริยะ", genre: BookGenre.Science, publishedYear: 2022, available: true, id: 3 });
// แสดงรายชื่อหนังสือทั้งหมด
myLibrary.displayBooks();
// ค้นหาหนังสือ
console.log("ค้นหาหนังสือตามชื่อ:");
myLibrary.findBooksByField("title", "1984");
// อัปเดตข้อมูลผู้เขียน
console.log("อัปเดตผู้เขียนของหนังสือ:");
myLibrary.modifyBook(2, { author: "George Orwell (Updated)" });
// ลบหนังสือ
console.log("ลบหนังสือออกจากห้องสมุด:");
myLibrary.removeBook(1);
console.log("รายชื่อหนังสือในห้องสมุดหลังการลบ:");
myLibrary.displayBooks();
// ลบหนังสือที่ไม่มีในลิสต์
console.log("ลบหนังสือที่ไม่มีอยู่:");
myLibrary.removeBook(999);
// บันทึกข้อมูลหนังสือ
myLibrary.saveLibraryToFile('libraryData.json');
// โหลดข้อมูลหนังสือจากไฟล์
myLibrary.loadLibraryFromFile('libraryData.json');
