package com.namrata.quizapp.controller;

import com.namrata.quizapp.model.Question;
import com.namrata.quizapp.service.IQuestionService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import static org.springframework.http.HttpStatus.CREATED;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:5173")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/quizzes")
public class QuestionController {

    private final IQuestionService questionService;

    @PostMapping("/create-new-question")
    public ResponseEntity<Question> createQuestion(@Valid @RequestBody Question question){
        Question createdQuestion = questionService.createQuestion(question);
        return ResponseEntity.status(CREATED).body(createdQuestion);
    }


    @GetMapping("/all-questions")
    public ResponseEntity<List<Question>> getAllQuestions()
    {
        List<Question> allQuestions = questionService.getAllQuestions();
        return  ResponseEntity.ok(allQuestions);
    }

    @GetMapping("/question/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Long id) throws ChangeSetPersister.NotFoundException {
        Optional<Question> questionById = questionService.getQuestionById(id);
        if(questionById.isPresent())
        {
            return ResponseEntity.ok(questionById.get());
        }
        else {
            throw new ChangeSetPersister.NotFoundException();
        }
    }

    @PutMapping("/{id}/update")
    public ResponseEntity<Question> updateQuestion(@PathVariable Long id, @RequestBody Question question) throws ChangeSetPersister.NotFoundException {
        Question theQuestion=questionService.updateQuestion(id,question);
        return  ResponseEntity.ok(theQuestion);
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id)
    {
        questionService.deleteQuestion(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }



    @GetMapping("/subjects")
    public ResponseEntity<List<String>> getAllSubjects()
    {
        List<String> allSubjects = questionService.getAllSubjects();

        return ResponseEntity.ok(allSubjects);
    }

    @GetMapping("/fetch-questions-for-user")
    public ResponseEntity<List<Question>> getQuestionForUser(
            @RequestParam Integer noOfQuestion,
            @RequestParam String subject  // Make sure it matches the query parameter name (subject, lowercase)
    ) {

        List<Question> allQuestions = questionService.getQuestionsForUser(noOfQuestion, subject);
        List<Question> mutableQuestions = new ArrayList<>(allQuestions);
        Collections.shuffle(mutableQuestions);

        int availableQuestions = Math.min(noOfQuestion, mutableQuestions.size());
        List<Question> randomQuestions = mutableQuestions.subList(0, availableQuestions);


        return ResponseEntity.ok(randomQuestions);
    }


}
