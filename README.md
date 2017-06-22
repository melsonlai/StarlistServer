# Starlist_Server

This is the back end of Starlist Web App, which includes:

## Todo
### Accomplish a TodoItem
+ Method: PUT
+ Query: `/todos/${TodoItem.props.userID}/${TodoItem.props.id}?accomplish=${1, 0}`
+ Body: None
+ Return: `{"id": ${TodoItem.props.id}}`

### Create a TodoItem
+ Method: POST
+ Query: `/todos/${TodoItem.props.userID}`
+ Body
	```
	{
		"title": ${TodoItem.props.title},
		"content": ${TodoItem.props.content},
		"deadline": ${TodoItem.props.deadline},
		"importance": ${TodoItem.props.importance}
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
		"doneTs": ${TodoItem.props.doneTs},
		"userID": ${TodoItem.props.userID}
	}
	```

### Edit a TodoItem
+ Method: PUT
+ Query: `/todos/${TodoItem.props.userID}/${TodoItem.props.id}`
+ Body
	```
	{
		"title": ${TodoItem.props.title},
		"content": ${TodoItem.props.content},
		"deadline": ${TodoItem.props.deadline},
		"importance": ${TodoItem.props.importance}
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
		"doneTs": ${TodoItem.props.doneTs},
		"userID": ${TodoItem.props.userID}
	}
	```


### Delete a TodoItem
+ Method: DELETE
+ Query: `/todos/${TodoItem.props.userID}/${TodoItem.props.id}`
+ Body: None
+ Return: `{"id": ${TodoItem.props.id}}`

### List a TodoItem
+ Method: GET
+ Query: `/todos/${TodoItem.props.userID}/${TodoItem.props.id}`
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
		"doneTs": ${TodoItem.props.doneTs},
		"userID": ${TodoItem.props.userID}
	}
	```

### List TodoItems
+ Method: GET
+ Query: `/todos/${TodoItem.props.userID}?start=${TodoItem.props.deadline}`
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

## Star
### Column
#### dbID
+ Type: `PRIMARY KEY`
+ Importance: Very High
+ Description: 在資料庫裡存取用的key。

#### starID
+ Type: `text`
+ Importance: Low
+ Description: 星星在學術上本來就有的ID（希臘字母之類的），當作介紹資料，沒有實質開發上的需求，可移除。這項資料可能不存在。

#### Const
+ Type: `text`
+ Importance: High
+ Description: 代表所屬的星座縮寫，未來實作星座連線功能時需要，重要資料。這項資料可能不存在。

#### IAUName
+ Type: `text`
+ Importance: Low
+ Description: IAU（國際天文學聯合會）所取的名稱，如Sirius，當作介紹資料。這項資料可能不存在。

#### Designation
+ Type: `text`
+ Importance: Low
+ Description: 應該是編號，我也不懂，當作介紹資料，可移除。這項資料可能不存在。

#### RA
+ Type: `real`
+ Importance: High
+ Description: 赤經，用來計算位置，重要資料。

#### Dec
+ Type: `real`
+ Importance: High
+ Description: 赤緯，用來計算位置，重要資料。

#### Vmag
+ Type: `real`
+ Importance: High
+ Description: 視星等，表現亮度。

#### Example
+ dbID: 1
+ starID: α
+ Const: CMa
+ IAUName: Sirius
+ Designation: HR_2491
+ RA: 101.287155
+ Dec: -16.716116
+ Vmag: -1.44

### API
#### Get User Stars
+ Method: GET
+ Query: `/stars/${TodoItem.props.userID}`
+ Body: None
+ Return
	```
	[
		{
			"dbID",
			"starID",
			const,
			"IAUName",
			designation,
			ra,
			dec,
			vmag, 
		}, ...
	]
	```

## User
### Request New User
+ Method: POST
+ Query: `/users`
+ Body: None
+ Return: `{"id": ${User.props.id}}`
