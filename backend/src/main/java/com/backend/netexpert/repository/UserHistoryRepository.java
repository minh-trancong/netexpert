package com.backend.netexpert.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.backend.netexpert.entity.UserHistory;

@Repository
public interface UserHistoryRepository extends CrudRepository<UserHistory, String> {

    @Modifying
    @Transactional
    @Query(value = """

            INSERT INTO chat_history (chat_id, history)
            VALUES (:chatId, :newHistory::jsonb);
        """, nativeQuery = true)
    void upsertHistory(String chatId, String newHistory);
}
