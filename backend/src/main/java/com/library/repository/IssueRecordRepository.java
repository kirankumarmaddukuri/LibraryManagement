package com.library.repository;

import com.library.model.IssueRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssueRecordRepository extends JpaRepository<IssueRecord, Long> {
    long countByMember_MemberIdAndReturnDateIsNull(Long memberId);
    List<IssueRecord> findByMember_MemberId(Long memberId);
    List<IssueRecord> findByMember_MemberIdAndReturnDateIsNull(Long memberId);
}
