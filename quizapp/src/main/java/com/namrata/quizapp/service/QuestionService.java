package com.namrata.quizapp.service;

import com.namrata.quizapp.model.Question;
import com.namrata.quizapp.repo.QuestionRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class QuestionService implements  IQuestionService{

    private final QuestionRepo questionRepo;

    @Override
    public Question createQuestion(Question question) {
        return questionRepo.save(question);
    }

    @Override
    public List<Question> getAllQuestions() {
        return questionRepo.findAll();
    }

    @Override
    public Optional<Question> getQuestionById(Long id) {
        return questionRepo.findById(id);
    }

    @Override
    public List<String> getAllSubjects() {
        return questionRepo.findDistinctSubject();
    }

    @Override
    public Question updateQuestion(Long id, Question question) throws ChangeSetPersister.NotFoundException {
       Optional<Question> theQuestion=this.getQuestionById(id);
       if(theQuestion.isPresent())
       {
           Question updatedQuestion=theQuestion.get();
           updatedQuestion.setQuestion(question.getQuestion());
           updatedQuestion.setChoices(question.getChoices());
           updatedQuestion.setCorrectAnswers(question.getCorrectAnswers());
           return questionRepo.save(updatedQuestion);

       }
       else {
          throw new ChangeSetPersister.NotFoundException();
       }

    }

    @Override
    public void deleteQuestion(Long id)  {

        Optional<Question> byId = questionRepo.findById(id);
        if(byId.isPresent())
        {
            questionRepo.deleteById(id);
        }

    }

    @Override
    public List<Question> getQuestionsForUser(Integer numOfQuestions, String subject)  {

        Pageable pageable= PageRequest.of(0,numOfQuestions);


        return  questionRepo.findBySubject(subject,pageable).getContent();

    }
}
