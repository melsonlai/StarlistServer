# Starlist_Server

This is the back end of Starlist Web App, which includes:

# Todo
## Accomplish a TodoItem
+ Method: PUT
+ Query: `/todos/${TodoItem.props.id}/?accomplish=1`
+ Body: None
+ Return: `{"id": ${TodoItem.props.id}}`

## Create a TodoItem
+ Method: POST
+ Query: `/todos`
+ Body
	```
	{
		"title": ${TodoItem.props.title},
		"content": ${TodoItem.props.content},
		"deadline": ${TodoItem.props.deadline},
		"importance": ${TodoItem.props.importance},
		"starID": ${TodoItem.props.starID},
	}
	```
+ Return
	```
	{
		"id": ${TodoItem.props.id},
		"title": ${TodoItem.props.title},
		"content": ${TodoItem.props.content},
		"deadline": ${TodoItem.props.deadline},
		"importance": ${TodoItem.props.importance},
		"starID": ${TodoItem.props.starID},
		"ts": ${TodoItem.props.ts},
		"doneTs": ${TodoItem.props.doneTs}
	}
	```

## Edit a TodoItem
+ Method: PUT
+ Query: `/todos/${TodoItem.props.id}`
+ Body
	```
	{
		"title": ${TodoItem.props.title},
		"content": ${TodoItem.props.content},
		"deadline": ${TodoItem.props.deadline},
		"importance": ${TodoItem.props.importance},
		"starID": ${TodoItem.props.starID},
	}
	```
+ Return
	```
	{
		"id": ${TodoItem.props.id},
		"title": ${TodoItem.props.title},
		"content": ${TodoItem.props.content},
		"deadline": ${TodoItem.props.deadline},
		"importance": ${TodoItem.props.importance},
		"starID": ${TodoItem.props.starID},
		"ts": ${TodoItem.props.ts},
		"doneTs": ${TodoItem.props.doneTs}
	}
	```


## Delete a TodoItem
+ Method: DELETE
+ Query: `/todos/${TodoItem.props.id}`
+ Body: None
+ Return: `{"id": ${TodoItem.props.id}}`

## List a TodoItem
+ Method: GET
+ Query: `/todos/${TodoItem.props.id}`
+ Body: None
+ Return
	```
	{
		"id": ${TodoItem.props.id},
		"title": ${TodoItem.props.title},
		"content": ${TodoItem.props.content},
		"deadline": ${TodoItem.props.deadline},
		"importance": ${TodoItem.props.importance},
		"starID": ${TodoItem.props.starID},
		"ts": ${TodoItem.props.ts},
		"doneTs": ${TodoItem.props.doneTs}
	}
	```

## List TodoItems
+ Method: GET
+ Query: `/todos?start=${TodoItem.props.deadline}`
+ Optional Query: `searchText=${searchText}`, `unaccomplishedOnly=${0, 1}`
+ Body: None
+ Return
	```
	[
		{
			"id": ${TodoItem.props.id},
			"title": ${TodoItem.props.title},
			"content": ${TodoItem.props.content},
			"deadline": ${TodoItem.props.deadline},
			"importance": ${TodoItem.props.importance},
			"starID": ${TodoItem.props.starID},
			"ts": ${TodoItem.props.ts},
			"doneTs": ${TodoItem.props.doneTs}
		}, ...
	]
	```
+ Description: Returns up to 10 TodoItems whose `${props.deadline}` are prior and closest to `start`.

# Star
+ (Unknown)
