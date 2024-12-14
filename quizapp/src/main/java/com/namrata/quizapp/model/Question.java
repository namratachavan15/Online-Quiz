package com.namrata.quizapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Question text cannot be blank")
    private String question;

    @NotBlank(message = "Subject cannot be blank")
    private String subject;

    @NotBlank(message = "Question type cannot be blank")
    private String questionType;

   // @NotEmpty(message = "Choices cannot be empty")
    @ElementCollection
    private List<String> choices;

  //  @NotEmpty(message = "Correct answers cannot be empty")
    @ElementCollection
    private List<String> correctAnswers;
    
}
