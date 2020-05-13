### openapi-generator

- swaggerUIで動かす
  ```
	docker run --rm -p 8080:8080 -e SWAGGER_JSON=/local/swagger.yaml -v ${PWD}:/local swaggerapi/swagger-ui:v3.20.1
	```

- stubサーバー作成する

	コード生成
  ```
  docker run --rm -v ${PWD}:/local openapitools/openapi-generator-cli generate -i /local/openapi.yaml -g spring -o /local/spring_stub --additional-properties returnSuccessCode=true
  ```

	ビルド
  ```
  docker run --rm -v ${PWD}:/usr/src/mymaven -w /usr/src/mymaven maven mvn package
  ```

	起動
  ```
  docker run --rm -p 3000:3000 -v ${PWD}:/usr/src/myapp -w /usr/src/myapp java java -jar target/openapi-spring-1.0.0.jar
  ```

- opeAPIgeneratorでapiクライアントを作成する
	```
  docker run --rm -v ${PWD}:/local openapitools/openapi-generator-cli generate -g typescript-axios -DnpmName='book-api' -i /local/swagger.yaml -o /local/book-api-client
	```