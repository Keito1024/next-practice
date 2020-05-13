package org.openapitools.api;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.request.NativeWebRequest;
import java.util.Optional;
@javax.annotation.Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2020-05-13T17:06:09.032Z[GMT]")

@Controller
@RequestMapping("${openapi.book.base-path:}")
public class BooksApiController implements BooksApi {

    private final NativeWebRequest request;

    @org.springframework.beans.factory.annotation.Autowired
    public BooksApiController(NativeWebRequest request) {
        this.request = request;
    }

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return Optional.ofNullable(request);
    }

}
