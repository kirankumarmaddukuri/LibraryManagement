package com.library.controller;

import com.library.dto.IssueRequest;
import com.library.model.IssueRecord;
import com.library.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/issues")
@CrossOrigin("*")
public class IssueController {

    @Autowired
    private IssueService issueService;

    @PostMapping("/issue")
    public IssueRecord issueBook(@RequestBody IssueRequest request) {
        return issueService.issueBook(request.getBookId(), request.getMemberId());
    }

    @PutMapping("/return/{issueId}")
    public IssueRecord returnBook(@PathVariable Long issueId) {
        return issueService.returnBook(issueId);
    }
}
