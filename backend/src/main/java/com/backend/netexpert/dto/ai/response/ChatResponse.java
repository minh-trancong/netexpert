package com.backend.netexpert.dto.ai.response;

import java.util.List;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Builder
@Getter
@Setter
public class ChatResponse {
    private int user_id;
    private String status;
    private String reponse;

    private List<String> devices;
    private List<Networks> networks; // Chuyen tu list -> object
    
    private List<String> blogs;

    public static class Networks {
        private String type;
        private List<Devices> devices;
        private Network_Diagram network_diagram;
        private float cost;
    }

    public static class Devices {
        private String id;
        private String device_type;
        private String name;
        private int quantity;
        private String img_url;
    }

    public static class Network_Diagram {
        private String device_id;
        private List<String> connection_to;
    }
}
