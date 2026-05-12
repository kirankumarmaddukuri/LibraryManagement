package com.library.service;

import com.library.model.Member;
import com.library.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    public Member registerMember(Member member) {
        return memberRepository.save(member);
    }

    public Optional<Member> getMember(Long id) {
        return memberRepository.findById(id);
    }

    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }
}
