package com.backend.netexpert.entity;



import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.FieldDefaults;


@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Blogs {
    @Id
    int id;
    String content;
    String title;
    String summary;
    String create_at;
    String category;
    String thumbnail;
}
