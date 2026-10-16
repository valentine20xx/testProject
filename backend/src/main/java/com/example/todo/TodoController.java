package com.example.todo;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/todos")
@Tag(name = "Todos", description = "CRUD operations on todo items")
public class TodoController {

    private final TodoRepository repository;

    public TodoController(TodoRepository repository) {
        this.repository = repository;
    }

    @Operation(summary = "List all todos")
    @GetMapping
    public List<Todo> findAll() {
        return repository.findAll();
    }

    @Operation(summary = "Get one todo by id")
    @GetMapping("/{id}")
    public Todo findById(@PathVariable String id) {
        return repository.findById(id).orElseThrow(TodoController::notFound);
    }

    @Operation(summary = "Create a todo")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Todo create(@Valid @RequestBody Todo todo) {
        todo.setId(null);
        return repository.save(todo);
    }

    @Operation(summary = "Update a todo")
    @PutMapping("/{id}")
    public Todo update(@PathVariable String id, @Valid @RequestBody Todo todo) {
        if (!repository.existsById(id)) {
            throw notFound();
        }
        todo.setId(id);
        return repository.save(todo);
    }

    @Operation(summary = "Delete a todo")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String id) {
        if (!repository.existsById(id)) {
            throw notFound();
        }
        repository.deleteById(id);
    }

    private static ResponseStatusException notFound() {
        return new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found");
    }
}
