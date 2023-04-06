import './App.css';
import { useEffect, useState } from 'react';
import sample from './sampledata';
import {
	Box,
	Image,
	Flex,
	Spacer,
	Grid,
	GridItem,
	SimpleGrid,
	Stack,
	HStack,
	VStack,
	Wrap,
	WrapItem,
	Center,
	Container,
	Text,
	Heading,
	Input,
	IconButton,
	Button,
	Select,
	Textarea,
	Link,
	Tag,
	TagLabel,
	TagLeftIcon,
	TagRightIcon,
	useMediaQuery,
	LinkBox,
	LinkOverlay,
} from '@chakra-ui/react';
import { SearchIcon, TimeIcon } from '@chakra-ui/icons';

function App() {
	const [search, setSearch] = useState('');

	const [checked, setChecked] = useState(false);
	const [safemode, setSafemode] = useState('0');

	const [genre, setGenre] = useState('0');
	const [type, setType] = useState('podcast');
	const [field, setField] = useState('title');
	const [podcastData, setPodcastData] = useState(undefined);
	const [podcastSearch, setPodcastSearch] = useState({
		search: 'star wars', // double quotes for verbatim, otherwise fuzzy
		date: 0, // 0: relevance, 1: date
		type: 'podcast', // episode, podcast, curated
		length_min: 10, // applicable only on episode type
		length_max: 30, // applicable only on episode type
		genre: '68', // if not specified all genres included
		only_in: 'title', // title, description, author, and audio.
		safe_mode: '0', // 1 enabled, 0 disabled
	});

	const genres = [
		{
			id: 0,
			name: 'All Genres',
		},
		{
			id: 100,
			name: 'Arts',
			parent_id: 67,
		},
		{
			id: 93,
			name: 'Business',
			parent_id: 67,
		},
		{
			id: 133,
			name: 'Comedy',
			parent_id: 67,
		},
		{
			id: 111,
			name: 'Education',
			parent_id: 67,
		},
		{
			id: 168,
			name: 'Fiction',
			parent_id: 67,
		},
		{
			id: 117,
			name: 'Government',
			parent_id: 67,
		},
		{
			id: 88,
			name: 'Health & Fitness',
			parent_id: 67,
		},
		{
			id: 125,
			name: 'History',
			parent_id: 67,
		},
		{
			id: 132,
			name: 'Kids & Family',
			parent_id: 67,
		},
		{
			id: 82,
			name: 'Leisure',
			parent_id: 67,
		},
		{
			id: 151,
			name: 'Locally Focused',
			parent_id: 67,
		},
		{
			id: 134,
			name: 'Music',
			parent_id: 67,
		},
		{
			id: 99,
			name: 'News',
			parent_id: 67,
		},
		{
			id: 144,
			name: 'Personal Finance',
			parent_id: 67,
		},
		{
			id: 69,
			name: 'Religion & Spirituality',
			parent_id: 67,
		},
		{
			id: 107,
			name: 'Science',
			parent_id: 67,
		},
		{
			id: 122,
			name: 'Society & Culture',
			parent_id: 67,
		},
		{
			id: 77,
			name: 'Sports',
			parent_id: 67,
		},
		{
			id: 68,
			name: 'TV & Film',
			parent_id: 67,
		},
		{
			id: 127,
			name: 'Technology',
			parent_id: 67,
		},
		{
			id: 135,
			name: 'True Crime',
			parent_id: 67,
		},
	];

	function getPodcasts() {
		const api = process.env.REACT_APP_PODCAST_API2;
		const myHeaders = new Headers();
		myHeaders.append('X-ListenAPI-Key', api);

		const myRequest = new Request(
			`https://listen-api.listennotes.com/api/v2/search?q=${
				podcastSearch.search
			}&sort_by_date=${podcastSearch.date}&type=${
				podcastSearch.type
			}&offset=0&len_min=${podcastSearch.length_min}&len_max=${
				podcastSearch.length_max
			}${
				genre != '0' ? `&genre_ids=${podcastSearch.genre}` : ''
			}&published_before=0&published_after=0&only_in=${
				podcastSearch.only_in
			}&language=English&safe_mode=${podcastSearch.safe_mode}`,
			{
				method: 'GET',
				headers: myHeaders,
				mode: 'cors',
				cache: 'default',
			}
		);

		fetch(myRequest)
			.then((res) => res.json())
			.then((data) => setPodcastData(data));
		//.then(data => console.log(data))
	}

	function handleSubmit(e) {
		e.preventDefault();
		setPodcastSearch((prev) => ({
			...prev,
			genre: genre,
			type: type,
			only_in: field,
			safe_mode: safemode,
		}));
		getPodcasts();
		setSearch('');
	}

	function handleInput(e) {
		setSearch(e.target.value);
		setPodcastSearch((prev) => ({
			...prev,
			search: e.target.value,
		}));
	}

	function handleGenre(e) {
		setGenre(e.target.value);
		setPodcastSearch((prev) => ({
			...prev,
			genre: e.target.value === '0' ? '' : e.target.value,
		}));
	}

	function handleType(e) {
		setType(e.target.value);
		setPodcastSearch((prev) => ({
			...prev,
			type: e.target.value,
		}));
	}

	function handleField(e) {
		setField(e.target.value);
		setPodcastSearch((prev) => ({
			...prev,
			only_in: e.target.value,
		}));
	}

	function handleSafemode(e) {
		//setChecked(!checked);
		setSafemode(e.target.value);
		setPodcastSearch((prev) => ({
			...prev,
			safe_mode: e.target.value,
		}));
	}

	function printConsole() {
		//console.log(sample);
		setPodcastData(sample);
		setPodcastSearch((prev) => ({
			...prev,
			genre: genre,
			type: type,
			only_in: field,
			safe_mode: safemode,
		}));

		let print = `https://listen-api.listennotes.com/api/v2/search?q=${
			podcastSearch.search
		}&sort_by_date=${podcastSearch.date}&type=${
			podcastSearch.type
		}&offset=0&len_min=${podcastSearch.length_min}&len_max=${
			podcastSearch.length_max
		}${
			genre != '0' ? `&genre_ids=${podcastSearch.genre}` : ''
		}&published_before=1580172454000&published_after=0&only_in=${
			podcastSearch.only_in
		}&language=English&safe_mode=${podcastSearch.safe_mode}`;

		console.log(print);
		//console.log(podcastData)
	}
	const [isMobile] = useMediaQuery('(max-width: 768px');
	/* 	common breakpoints:
		480px,
		768px,
		1024px,
		1200px
	*/

	return (
		<>
			<Box display='none'>
				<Text fontSize='4xl'>Podcast Search Directory</Text>
				<form action='/' method='get' onSubmit={handleSubmit}>
					<label>Search Term: </label>
					<Input
						type='text'
						size='sm'
						htmlSize={34}
						width='auto'
						placeholder='e.g. person, place, topic'
						value={search}
						onInput={(e) => handleInput(e)}
					/>
					<Button type='submit' size='sm' leftIcon={<SearchIcon />}>
						Search
					</Button>
					<br />
					<label>Allow Explicit Language?</label>
					{/* // need to work out checkbox code //
        <input 
        type="checkbox"  
        checked={checked}
        onChange={() => handleSafemode()} 
      /> 
      */}
					<Select
						size='xs'
						maxWidth='60px'
						value={safemode}
						onChange={(e) => handleSafemode(e)}
					>
						<option value='1'>No</option>
						<option value='0'>Yes</option>
					</Select>
					<br />
					<Box display='flex' alignContent='space-between' gap={4}>
						Genre:
						<Select
							size='sm'
							maxWidth='158px'
							value={genre}
							onChange={(e) => handleGenre(e)}
						>
							{genres.map((item) => (
								<option key={item.id} value={item.id}>
									{item.name}
								</option>
							))}
						</Select>
						Scope:
						<Select
							size='sm'
							maxWidth='158px'
							value={type}
							onChange={(e) => handleType(e)}
						>
							<option value='podcast'>Podcast</option>
							<option value='episode'>Episode</option>
						</Select>
						Search Field:
						<Select
							size='sm'
							maxWidth='158px'
							onChange={(e) => handleField(e)}
						>
							<option value='title'>Title</option>
							<option value='description'>Description</option>
							<option value='author'>Author</option>
						</Select>
					</Box>
				</form>

				<Flex
					direction='column'
					align='center'
					w='768px'
					m='0 auto'
					borderColor={'yellow'}
					borderWidth='2px'
				>
					<Text>
						{isMobile
							? 'this is a mobile device'
							: 'this is a desktop device'}
					</Text>

					<HStack spacing='24px' pt='5'>
						<Wrap spacing='24px' justify='center'>
							{podcastData === undefined
								? ''
								: podcastData.results.map((items) => (
										<Box
											borderWidth='1px'
											borderRadius='lg'
											borderColor={'Red'}
											width='100%'
											// overflow="hidden"
											p='3'
										>
											<Image
												src={items.thumbnail}
												borderRadius='lg'
												boxSize='150px'
												objectFit='contain'
												href={items.listennotes_url}
											/>
											<Box
												display='flex'
												alignItems='baseline'
											>
												<Text
													color='gray.500'
													fontWeight='semibold'
													letterSpacing='wide'
													fontSize='xs'
													textTransform='uppercase'
													ml='2'
												>
													By{' '}
													{items.publisher_original}
													<br />
													{new Date(
														items.earliest_pub_date_ms
													).toLocaleDateString(
														'en-us',
														{
															month: 'short',
															year: 'numeric',
														}
													)}
												</Text>
											</Box>
											<Box
												mt='1'
												fontWeight='semibold'
												as='h4'
												lineHeight='tight'
												isTruncated
											>
												{items.title_original}
											</Box>
											<Box>
												<Tag size='sm' variant='subtle'>
													<TagLeftIcon
														boxSize='12px'
														as={TimeIcon}
													/>
													<TagLabel>
														<Text
															fontSize='xs'
															color='gray.600'
															textAlign='right'
														>
															{new Date(
																items.latest_pub_date_ms
															).toLocaleDateString(
																'en-us',
																{
																	dateStyle:
																		'short',
																}
															)}
														</Text>
													</TagLabel>
												</Tag>

												<Box
													as='span'
													color='gray.600'
													fontSize='sm'
												>
													<Text noOfLines={5}>
														{
															items.description_highlighted
														}
													</Text>
												</Box>
											</Box>
											<Box
												display='flex'
												mt='2'
												alignItems='baseline'
												color='gray.500'
												fontWeight='semibold'
												letterSpacing='wide'
												fontSize='xs'
												textTransform='uppercase'
											>
												Genre:{' '}
												<HStack spacing={1}>
													{items.genre_ids.map(
														(item) =>
															genres
																.filter(
																	(genre) =>
																		genre.id ===
																		item
																)
																.map((i) => (
																	<Tag
																		pacing='1'
																		size='sm'
																		colorScheme='teal'
																	>
																		{i.name}
																	</Tag>
																))
													)}
												</HStack>
											</Box>
										</Box>
								  ))}
						</Wrap>
					</HStack>
				</Flex>
			</Box>

			{/* main page container */}
			<Container
				//column={1}
				//columns={{ sm: 1, md: 1, lg: 1 }}
				//columns={"xl: 1"}
				gap='4'
				//borderWidth={"1px"}
				//borderColor="red"
				justifyItems='center'
				maxWidth={'1200px'}
			>
				<Container
					//borderWidth={"1px"}
					//borderColor="blue"
					borderRadius={'6px'}
					bgColor='#f0f0f0'
					maxW={'768px'}
					py='5px'
				>
					<Text fontSize='4xl'>Podcast Search Directory</Text>
					<form action='/' method='get' onSubmit={handleSubmit}>
						<label>Search Term: </label>
						<Input
							type='text'
							size='sm'
							htmlSize={34}
							width='auto'
							placeholder='e.g. person, place, topic'
							value={search}
							onInput={(e) => handleInput(e)}
						/>
						<Button
							type='submit'
							size='sm'
							bg='#b82f00'
							color='white'
							leftIcon={<SearchIcon />}
							_hover={{ color: 'white', bg: 'gray' }}
						>
							Search
						</Button>
						{/* <label>Allow Explicit Language?</label>
						<Select
							size="xs"
							maxWidth="60px"
							value={safemode}
							onChange={(e) => handleSafemode(e)}
						>
							<option value="1">No</option>
							<option value="0">Yes</option>
						</Select> */}
						<br />
						<Box
							display='flex'
							alignContent='space-between'
							gap={4}
						>
							Genre:
							<Select
								size='sm'
								value={genre}
								maxWidth='150px'
								onChange={(e) => handleGenre(e)}
							>
								{genres.map((item) => (
									<option key={item.id} value={item.id}>
										{item.name}
									</option>
								))}
							</Select>
							Scope:
							<Select
								size='sm'
								width='150px'
								value={type}
								onChange={(e) => handleType(e)}
							>
								<option value='podcast'>Podcast</option>
								<option value='episode'>Episode</option>
							</Select>
							Search Field:
							<Select
								size='sm'
								maxWidth='150px'
								onChange={(e) => handleField(e)}
							>
								<option value='title'>Title</option>
								<option value='description'>Description</option>
								<option value='author'>Author</option>
							</Select>
						</Box>
					</form>
				</Container>
				{podcastData === undefined
					? ''
					: podcastData.results.map((items) => (
							<Container
								//borderWidth={"1px"}
								//borderColor="blue"
								borderRadius={'6px'}
								bgColor='#f0f0f0'
								maxW='768px'
								//width="100%"
								//w="768px"
								my={'10px'}
								py='10px'
							>
								{/* project card for each podcast (container) */}
								<Box
									//borderWidth={"1px"} borderColor="green"
									pb='5px'
								>
									<Text fontSize='lg' fontWeight={'semibold'}>
										{items.title_original}
									</Text>
								</Box>
								<Box
									//borderWidth={"1px"}
									//borderColor="yellow"
									//display={"inline-flex"}
									display='flex'
								>
									<Link
										href={items.website}
										isExternal
										_hover={{
											filter: 'auto',
											brightness: '60%',
										}}
									>
										<Image
											src={items.thumbnail}
											boxSize='100px'
										/>
									</Link>
									<Text pl='5px'>
										By {items.publisher_original}
										<br />
										{items.total_episodes} episodes · {''}
										{new Date(
											items.earliest_pub_date_ms
										).toLocaleDateString('en-us', {
											month: 'short',
											year: 'numeric',
										})}
									</Text>
								</Box>
								<Box
									//borderWidth={"1px"} borderColor="orange"
									pt='4px'
								>
									<Tag
										size='md'
										variant='subtle'
										colorScheme={'red'}
									>
										<TagLeftIcon
											boxSize='12px'
											as={TimeIcon}
										/>
										<TagLabel>
											<Text
												fontSize='xs'
												color='gray.600'
												textAlign='right'
											>
												{new Date(
													items.latest_pub_date_ms
												).toLocaleDateString('en-us', {
													dateStyle: 'short',
												})}
											</Text>
										</TagLabel>
									</Tag>
									<Text noOfLines={3}>
										{items.description_highlighted}
									</Text>
								</Box>
								<br />
								<Box
								//borderWidth={"1px"} borderColor="purple"
								>
									<HStack spacing={1}>
										{items.genre_ids.map((item) =>
											genres
												.filter(
													(genre) => genre.id === item
												)
												.map((i) => (
													<Tag
														pacing='1'
														size='sm'
														colorScheme='teal'
													>
														{i.name}
													</Tag>
												))
										)}
									</HStack>
								</Box>
							</Container>
					  ))}
			</Container>
			<div>
				<p>
					{podcastData === undefined
						? ''
						: console.log(podcastData.results)}
				</p>
			</div>
			<br />
			{/* <Button size="xs" colorScheme="blue" onClick={printConsole}>
				Print podcast data to console
			</Button> */}
		</>
	);
}

export default App;
