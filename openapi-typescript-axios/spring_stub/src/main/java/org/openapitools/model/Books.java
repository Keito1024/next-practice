package org.openapitools.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.ArrayList;
import java.util.List;
import org.openapitools.model.Book;
import org.openapitools.jackson.nullable.JsonNullable;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * Books
 */
@javax.annotation.Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2020-05-13T17:06:09.032Z[GMT]")

public class Books   {
  @JsonProperty("books")
  @Valid
  private List<Book> books = new ArrayList<>();

  public Books books(List<Book> books) {
    this.books = books;
    return this;
  }

  public Books addBooksItem(Book booksItem) {
    this.books.add(booksItem);
    return this;
  }

  /**
   * Get books
   * @return books
  */
  @ApiModelProperty(required = true, value = "")
  @NotNull

  @Valid

  public List<Book> getBooks() {
    return books;
  }

  public void setBooks(List<Book> books) {
    this.books = books;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Books books = (Books) o;
    return Objects.equals(this.books, books.books);
  }

  @Override
  public int hashCode() {
    return Objects.hash(books);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Books {\n");
    
    sb.append("    books: ").append(toIndentedString(books)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}

