package com.example.todo;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(TodoController.class)
class TodoControllerTest {

    @Autowired MockMvc mvc;
    @MockitoBean TodoRepository repository;

    private Todo todo(String id, String title) {
        Todo t = new Todo();
        t.setId(id);
        t.setTitle(title);
        return t;
    }

    @Test
    void listReturnsTodos() throws Exception {
        when(repository.findAll()).thenReturn(List.of(todo("1", "a")));
        mvc.perform(get("/api/todos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("a"));
    }

    @Test
    void getUnknownReturns404() throws Exception {
        when(repository.findById("x")).thenReturn(Optional.empty());
        mvc.perform(get("/api/todos/x")).andExpect(status().isNotFound());
    }

    @Test
    void createReturns201() throws Exception {
        when(repository.save(any(Todo.class))).thenReturn(todo("1", "new"));
        mvc.perform(post("/api/todos").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"new\"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value("1"));
    }

    @Test
    void createWithBlankTitleReturns400() throws Exception {
        mvc.perform(post("/api/todos").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"\"}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void updateExistingReturns200() throws Exception {
        when(repository.existsById("1")).thenReturn(true);
        when(repository.save(any(Todo.class))).thenReturn(todo("1", "changed"));
        mvc.perform(put("/api/todos/1").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"changed\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("changed"));
    }

    @Test
    void deleteExistingReturns204() throws Exception {
        when(repository.existsById("1")).thenReturn(true);
        mvc.perform(delete("/api/todos/1")).andExpect(status().isNoContent());
    }

    @Test
    void deleteUnknownReturns404() throws Exception {
        when(repository.existsById("1")).thenReturn(false);
        mvc.perform(delete("/api/todos/1")).andExpect(status().isNotFound());
    }
}
