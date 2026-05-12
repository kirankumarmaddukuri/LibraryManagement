package com.library.controller;

import com.library.model.IssueRecord;
import com.library.model.Book;
import com.library.model.Member;
import com.library.service.IssueService;
import com.library.service.MemberService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/members")
@CrossOrigin("*")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @Autowired
    private IssueService issueService;

    @PostMapping
    public Member registerMember(@Valid @RequestBody Member member) {
        return memberService.registerMember(member);
    }

    @GetMapping
    public List<Member> getAllMembers() {
        return memberService.getAllMembers();
    }

    @GetMapping("/{id}")
    public Member getMember(@PathVariable Long id) {
        return memberService.getMember(id)
                .orElseThrow(() -> new RuntimeException("Member not found"));
    }

    @GetMapping("/{id}/issues")
    public List<IssueRecord> getMemberIssues(@PathVariable Long id) {
        return issueService.getIssuesByMember(id);
    }

    @GetMapping("/{id}/books")
    public List<Book> getMemberBooks(@PathVariable Long id) {
        return issueService.getActiveBooksByMember(id);
    }
}
