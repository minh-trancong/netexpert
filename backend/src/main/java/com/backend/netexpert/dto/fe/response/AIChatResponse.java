package com.backend.netexpert.dto.fe.response;

import java.util.ArrayList;


public class AIChatResponse {

    public String status;
    public String response;
    public ArrayList<Device> devices;  // Change to List<Device> instead of List<Object>
    public ArrayList<Network> networks;
    public ArrayList<Object> blogs;  // You can keep it as Object if you expect no specific structure for blogs.

    public static class Device {
        public double quantity;  // Change to double to match the JSON
        public String id;
        public String device_type;
        public String name;
        public String img_url;
    }

    
    public static class Network {
        public String type;
        public ArrayList<Device> devices;
        public ArrayList<NetworkDiagram> network_diagram;
        public double cost;
    }

    public static class NetworkDiagram {
        public ArrayList<String> connection_to;
        public String device_id;
    }
}
