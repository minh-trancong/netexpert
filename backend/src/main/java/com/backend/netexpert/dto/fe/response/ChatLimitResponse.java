package com.backend.netexpert.dto.fe.response;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChatLimitResponse {
    public String timetitle;
    public List<Chats> chats;

    public static class Chats 
    {
        public String title;
        public String id;
        public LocalDateTime time;
    }
}
