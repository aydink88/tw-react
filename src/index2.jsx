// import axios from 'axios'
// const API = axios.create({ baseURL: process.env.REACT_APP_BASEURL || 'localhost:8080/api' })

// API.interceptors.request.use((req) => {
//   req.headers = {
//     'content-type': 'application/json'
//   }
//   if (localStorage.getItem('token')) {
//     req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))}`
//   }

//   return req
// })

// export const get = async (path, parmas = {}) => {
//   let response = await API.get(path, parmas)
//   return response.data
// }

// export const post = async (path, data) => {
//   let response = await API.post(path, data)
//   return response.data
// }

// export const patch = async (path, data) => {
//   let response = await API.patch(path, data)
//   return response.data
// }

// // export const post = (data) => API.post(paths.AUTH, data);

// export const AUTH = 'auth/signin'
// export const REFRESH_TOKEN = 'auth/refreshToken'
// export const FETCH_USER = 'user'
// export const UPDATE_USER = 'user'
// export const FETCH_QUESTIONS = 'assessment/questions'
// export const POST_ASSESSMENT = 'assessment/responses'
// export const FETCH_ADVICES = 'advices'
// export const FETCH_RATING = 'rating'
// export const UPDATE_RATING = 'rating'

// const careersSchema = mongoose.Schema({

// number: { type: String, required: true },
// intro: { type: String },
// education: { type: String },
// training: { type: String },
// scope: { type: String },
// career_name: {type: String},
// career_img : {type: String},

// code: [{type:String}]
// },{ timestamps: true });

// export default mongoose.model("Career", careersSchema);

// const advicesSchema = mongoose.Schema({
// code: {type:{ type: String, required: true }},
// number: { type: String, required: true },

// user_type: {
// type: String,
// enum: ['GUARDIAN' , 'STUDENT'],
// },
// career: [{ type: Schema.Types.ObjectId, ref: 'career' }]
// },{ timestamps: true }, { typeKey: '$type' });

// export default mongoose.model("Advice", advicesSchema);

// useEffect(() => {
// async function fetchRate() {
// try {
// const rate = await api.get(paths.FETCH_RATING)
// setRate(rate)
// console.log(rate + 'user rating');
// } catch (error) {
// console.log(error)
// }
// }

// fetchRate()
// // to rerender and refetch after user sends rating to database
// }, [props.rate]);

// const StarRating = (props) => {
// const [rate, setRate] = useState(0);
// console.log(props)

// // sends rating to database then updates the rating ui
// const handleRate = async (ratingToSave) => {
// const rateData = await api.post(paths.UPDATE_RATING, {
// rating: ratingToSave,
// // collegeId should come from wherever stored
// career: props.careerId,

// })
// setRate(rateData.rating)
// console.log(`here is new rating ${rateData.rating}`)
// }

// useEffect(() => {
// async function fetchRate() {
// try {
// const rateData = await api.get(paths.FETCH_RATING)

// setRate(rateData);
// console.log(rateData.rating + "user rating");

// } catch (error) {
// console.log(error)
// }
// }

// fetchRate()
// // to rerender and refetch after user sends rating to database
// }, []);

// return (
// <div>
// {[1,2,3,4,5]
// .map((idx) => (
// <label key={idx}>
// <Radio
// type="radio"
// name="rating"
// onClick={() => handleRate(idx)}
// value={rate}
// />
// <FaStar color={
// idx <= rate
// ? "rgb(192,192,192)"
// : "#f00"
// } />
// </label>
// ))}
// </div>
// )
// };

// function LinearProgressWithLabel(props) {
//   return (
//     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//       <Box sx={{ width: '100%', mr: 1 }}>
//         <LinearProgress variant="determinate" {...props} />
//       </Box>
//       <Box sx={{ minWidth: 35 , display:{xs:'flex', sm:'flex', md:'none', lg:'none'}}}>
//         <Typography variant="body2" color="text.secondary" sx={{color:'white', fontWeight:'bold' }}>{`${Math.round(
//           props.value,
//         )}%`}</Typography>
//       </Box>

//       <Box sx={{ minWidth: 35 , display:{xs:'none', sm:'none', md:'flex', lg:'flex', marginTop:'-106px', marginLeft:'-126px', flexDirection:'column', alignItems:'center'}}}>
//         <Typography variant="body2" color="text.secondary" sx={{color:'black', fontWeight:'bold', fontSize:'1.2rem' }}>{`${Math.round(
//           props.value,
//         )}%`}</Typography>
//       </Box>
//     </Box>
//   );
// }

// LinearProgressWithLabel.propTypes = {
//   /**
//    * The value of the progress indicator for the determinate and buffer variants.
//    * Value between 0 and 100.
//    */
//   value: PropTypes.number.isRequired,
// };

// const Assessment = (props) => {
//   const {progress: lastProgress} = props;

//     const {questions, assessment, options} = useSelector((state) => state.assessment);
//     const [user, setuser] = useState("");
//     const [currentQuestion, setCurrentQuestion] = useState(0);
//     const [checked, setChecked] = useState(true);
//     const [value, setValue] = useState('');
//     const [progress, setProgress] = useState(() => {
//       return Number((lastProgress) ?? 0);
//     });
//     console.log(progress + "last progress user reached");
//     const dispatch = useDispatch();
//     const history = useHistory();

//     const classes = useStyles();

// useEffect(() => {
//    //to get user details on assessment page.
//     const fetchData = async () => {
//         try {
//           const user = await api.get(paths.FETCH_USER);

//          setuser({sname : user.s_firstName , fname : user.s_lastName})
//         } catch (error) {
//           console.log("error", error);
//         }
//       };
//       fetchData();
// }, []);

// // this is to get thel questions from the history coming from redux store.
//     useEffect(() => {
//         if (!questions) {
//             dispatch(fetcQuestions(history))
//         }
//     });

//     useEffect(() => {
//       async function fetchProgress() {
//         try {
//           const { progress } = await api.get(paths.FETCH_USER);
//           console.log(progress + "alpha");
//           if (progress < 100) {
//             setProgress(Number(progress));
//           }
//           else if (progress === 100)
//           {
//             setProgress(Number(progress));
//             console.log("You completed !!");
//           }
//         } catch(error) {
//             console.log(error);

//         }
//       };

//       fetchProgress();
//     }, []);

//     useEffect(() => {
//       async function updateProgress() {
//         try {
//           await api.patch(paths.UPDATE_USER, JSON.stringify({ progress }))
//           console.log(progress + "valueof");
//         } catch(error){
//           console.log("error", error);
//         }
//       };

//       updateProgress();

//     }, [progress]);

//          const handleRadioChange = (number, event) => {

//         let currentSelection = questions.find(question => question.number === number);
//         console.log(currentSelection + "radio selected");
//         currentSelection.value = event.target.value;

//         questions[currentQuestion].value = event.target.value;

//          if (!(currentQuestion===5)) {
//       setChecked((previousState) => !previousState);

//       setTimeout(() => {
//         setChecked((previousState) => !previousState);

//         // Change the current question AFTER the previous one is gone
//         setCurrentQuestion((current) => {
//           return Math.min(
//             current + 1,
//             questions.length - 1
//           );
//         });
//       }, 1500);
//     }
//        };

//     const previousQuestion = (event) => {
//         event.preventDefault();
//         let new_current_questions = Math.max(currentQuestion - 1, 0);
//         setCurrentQuestion(new_current_questions);
//         setChecked((previousState) => !!previousState);
//        const a =  setTimeout(() => {
//         setChecked((previousState) => !!previousState);
//         }, 1000);

//       };

//     function handleSubmit(event) {
//         event.preventDefault();

//         const valid = questions.some((q) => !q.value);
//         console.log(valid + "questionsalpha");
//         if (!valid) {
//             dispatch(postAssessment({ responses: questions, id: assessment.id }, history));
//            console.log("Hello");
//         }
//          setChecked((previousState) => !previousState);

//             setTimeout(() => {
//               setChecked((previousState) => !previousState);

//               // Change the current question AFTER the previous one is gone
//               setCurrentQuestion(0);
//             }, 1500);
//             setProgress((prevProgress) => prevProgress + 10);
//     }
//     return (

//         !questions?.length ? <CircularProgress /> : (
//             <>
//             <Header/>
//             <Container maxwidth="sm" component="main" sx={{ mt: 15, mb: 2, flexGrow: 1 }}>

//             <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center" display="flex" sx={{ mt: 4, mb: 2, flexGrow: 1 }}>
//             <Fragment>
//             <Grid className={classes.container} container alignItems="stretch" spacing={1}>
//              <Typography variant="h6">Welcome  {user.sname} {user.fname} </Typography>
//             <Typography sx={{color: 'green', fontSize:'16px'}}>Lets Begin the Assessment.</Typography>
//              </Grid>
//              </Fragment>
//              </Grid>
//              </Container>

//              <Container component="main" sx={{ mt: 2, mb: 1, flexGrow: 1 }}>

// <Grid container spacing={3} direction="row" display="flex" sx={{flexGrow: 1}}>
// <Fragment>
//     <Grid item xs={12} sm={8} md={8} sx={{ overflowY: 'scroll '}}>

//     <Slide direction="up"
//     in={checked}
//     mountOnEnter
//     unmountOnExit
//     timeout={{ enter: 1000 , exit: checked ? 600 : 900}}
// >
//         <Card sx={{ bgcolor: "#F7F7F7"}} elevation={0}>
//             <CardContent>

//             <form onSubmit= {handleSubmit}>
//                     <CardActions>
//                   <Button type="submit" color="warning" variant="outlined" disabled={currentQuestion===0} className={classes.button} onClick={previousQuestion}>
//                       Previous</Button>
//                   </CardActions>
//                   <FormControl component='fieldset' className={classes.formControl}
//     data-hidden={questions[currentQuestion].number !==
//       currentQuestion[questions[currentQuestion].number]} >
//     <FormLabel component='legend'>
//       {questions[currentQuestion].question}
//     </FormLabel>
//     <FormLabel component='legend'>
//       {questions[currentQuestion].description}
//     </FormLabel>
//     <RadioGroup
//       aria-label='quiz'
//       name='quiz'
//       value={questions[currentQuestion].value}
//       checked={checked}
//       onClick={(e)=> handleRadioChange(questions[currentQuestion].number, e)}
//       sx={{
//         color: pink[800],
//         '&.Mui-checked': {
//           color: blue[600],
//         },
//       }}>
//       {options.map((option) => (
//         <FormControlLabel
//           key={option.score}
//           value={option.score}
//           control={<Radio  sx={{
//             color: pink[800],
//             '&.Mui-checked': {
//               color: blue[600],
//             },
//           }}/>}
//           label={option.label}

//         />
//       ))}
//     </RadioGroup>
//   </FormControl>
//                     <CardActions>
//                     <Button type="submit"
//                     variant="contained"
//                     color="primary"
//                     className={classes.button}
//                     disabled={!(currentQuestion === 5)}
//                    >
//                     Submit
//                 </Button>
//               </CardActions>
//                 </form>
//                 </CardContent>
//                 </Card>
//                 </Slide>

//                 </Grid>
//                    </Fragment>
//                    </Grid>

//                 <Grid item xs={12} md={4} sm={4}>
//               <Box sx={{ display: {xs: 'none', sm: 'none', md: 'flex'} }}>
//       <Box sx={{width:'100%', mr:1, mt: -18}}>
//                 <LinearProgressWithLabel sx={{
//     transform: "rotate(90deg)",
//     width: '375px',
//     height:'15px',
//         position:'fixed',
//     right: '83px',
//     display:'flex',
//     marginTop: '-70px'

//   }} variant="determinate" color="success" value={progress} />

//   </Box>
//                 </Box>

//          </Container>
//             </>
//         )
//     );
// };
// export default Assessment;
