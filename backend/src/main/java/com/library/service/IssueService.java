package com.library.service;

import com.library.model.Book;
import com.library.model.IssueRecord;
import com.library.model.Member;
import com.library.repository.BookRepository;
import com.library.repository.IssueRecordRepository;
import com.library.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class IssueService {

    @Autowired
    private IssueRecordRepository issueRecordRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Transactional
    public IssueRecord issueBook(Long bookId, Long memberId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));
        
        if (!book.isAvailability()) {
            throw new RuntimeException("Book is currently unavailable");
        }

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        long activeIssues = issueRecordRepository.countByMember_MemberIdAndReturnDateIsNull(memberId);
        if (activeIssues >= 3) {
            throw new RuntimeException("Member has reached the maximum limit of 3 active issues");
        }

        book.setAvailability(false);
        bookRepository.save(book);

        IssueRecord issueRecord = new IssueRecord();
        issueRecord.setBook(book);
        issueRecord.setMember(member);
        issueRecord.setIssueDate(LocalDate.now());

        return issueRecordRepository.save(issueRecord);
    }

    @Transactional
    public IssueRecord returnBook(Long issueId) {
        IssueRecord issueRecord = issueRecordRepository.findById(issueId)
                .orElseThrow(() -> new RuntimeException("Issue record not found"));

        if (issueRecord.getReturnDate() != null) {
            throw new RuntimeException("Book is already returned");
        }

        issueRecord.setReturnDate(LocalDate.now());

        Book book = issueRecord.getBook();
        book.setAvailability(true);
        bookRepository.save(book);

        return issueRecordRepository.save(issueRecord);
    }

    public List<IssueRecord> getIssuesByMember(Long memberId) {
        return issueRecordRepository.findByMember_MemberId(memberId);
    }

    public List<Book> getActiveBooksByMember(Long memberId) {
        memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        return issueRecordRepository.findByMember_MemberIdAndReturnDateIsNull(memberId)
                .stream()
                .map(IssueRecord::getBook)
                .collect(Collectors.toList());
    }
}
