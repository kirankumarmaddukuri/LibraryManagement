package com.library.controller;

import com.library.model.Book;
import com.library.service.BookService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
@CrossOrigin("*")
public class BookController {

    @Autowired
    private BookService bookService;

    @PostMapping
    public Book addBook(@Valid @RequestBody Book book) {
        return bookService.addBook(book);
    }

    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping("/available")
    public List<Book> getAvailableBooks() {
        return bookService.getAvailableBooks();
    }

    @GetMapping("/search")
    public List<Book> searchBooks(@RequestParam String query) {
        return bookService.searchBooks(query);
    }
}
