import {
    DetailsParent,
    RightSideDetails,
    LeftSideDetails,
} from "./ResultDetailsStyle";
import { Rating } from 'react-simple-star-rating'
import ImdbLogo from '../ImdbLogo.png'
import RottenTomatoesLogo from '../RottenTomatoes.png'
import MetacriticLogo from '../Metacritic.png'
import {useSelector , useDispatch} from "react-redux";
import {AddFavorite ,RemoveFavorite, selectFavoriteById} from "../Redux/FavoriteSlice";
import {AiOutlineVideoCamera , AiOutlineHeart , AiTwotoneHeart} from 'react-icons/ai'
import {RiBallPenLine , RiShareForwardFill} from 'react-icons/ri'
import {BiWorld} from 'react-icons/bi'
import {FaTheaterMasks} from 'react-icons/fa'
import {IoLanguage , IoWarningOutline} from 'react-icons/io5'
import {CgDollar} from 'react-icons/cg'
import {toast} from "react-toastify";
import {useLocation , useHref} from "react-router-dom";


const ResultDetailsShow = ({DetailsData}) => {


    const Location = useLocation()


    console.log(Location.pathname)


    const dispatch = useDispatch()


    const {Actors , Country , Metascore , BoxOffice , Director , Genre , Language , Plot ,
        Poster , Rated , Ratings  , Released , Runtime , Title , Type , Writer , Year , imdbRating , imdbVotes , imdbID} = DetailsData

    const Favorite = useSelector(state => selectFavoriteById(state , imdbID))

    console.log(Favorite)

    const RottenTomatoes = Ratings[1] ? Ratings[1].Value : 'N/A'

    const AddNotify = () => toast.success(`" ${Title} " Added to your favorites list`, {
        position: "top-center",
        autoClose: 3000,
    });

    const RemoveNotify = () => toast.error(`" ${Title} " Removed to your favorites list`, {
        position: "top-center",
        autoClose: 3000,
    });

    const AddFavoriteOnList = () =>
    {
        dispatch(AddFavorite({imdbID , Type , Year , Title , Poster , favorite : true }))
        AddNotify()
    }

    const DeleteFavoriteOnList = () =>
    {
        dispatch(RemoveFavorite({imdbID , Type , Year , Title , Poster , favorite : false}))
        RemoveNotify()
    }

    return (
        <DetailsParent>


            <RightSideDetails>

                <img className='DetailsPoster' src={Poster} alt={Title}/>
                <div className='DetailsFavorite'>{Favorite ? <AiTwotoneHeart onClick={DeleteFavoriteOnList} className='Icon'/> : <AiOutlineHeart onClick={AddFavoriteOnList} className='Icon'/>}</div>

                <section className='DetailsRate'>
                    <div className='Imdb'>

                        <img className='ImdbLogo' src={ImdbLogo} alt={'Imdb Logo'}/>

                        <div className='RateAndVotes'>
                            <div className='ImdbRate'> <b className='BoldRate'>{imdbRating}</b> / 10</div>
                            <div className='ImdbVotes'> Votes : {imdbVotes}</div>
                        </div>
                    </div>

                    <div className='RottenTomatoes'>
                        <img className='RottenTomatoesLogo' src={RottenTomatoesLogo} alt={'Imdb Logo'}/>
                        <div className='RottenTomatoesRate'> {RottenTomatoes} </div>
                    </div>

                    <div className='Metacritic'>
                        <img className='MetacriticLogo' src={MetacriticLogo} alt={'Imdb Logo'}/>
                        <div className='MetacriticRate'>{Metascore}</div>
                    </div>

                    <div className='ShareSection'>
                        <RiShareForwardFill className='ShareIcone'/>
                        <div className='ShareText'>Share This Page</div>
                    </div>
                    <div className='GetTickets'> Get Tickets </div>

                    <section className='StarRate'>
                        <p className='RateText'>Rate This</p>
                        <Rating
                                iconsCount={10}
                                size={25}
                                allowHover={true}
                                transition={true}
                                showTooltip={false}
                                tooltipArray={[ 'Awful' , 'bad', 'good' , 'very good' , 'Excellent']}/>
                    </section>
                </section>

            </RightSideDetails>

            <LeftSideDetails>

                <section className='DetailsTitle'> {Title} {Year}</section>

                <section className='DetailsInfo'>
                    <div className='Options'>{Released ? Released : 'N/A'}</div>
                    <div className='Options'>{Genre ? Genre : 'N/A'}</div>
                    <div className='Options'>{Runtime ? Runtime : 'N/A'}</div>
                    <div className='Options'>{Type}</div>
                </section>

                <section className='DetailsAdditionInfo'>
                    <div className='Options'>
                        <IoLanguage className='Icon'/>
                        <p className='Text'>{Language}</p>
                    </div>

                    <div className='Options'>
                        <CgDollar className='Icon'/>
                        <p className='Text'>{BoxOffice}</p>
                    </div>

                    <div className='Options'>
                        <IoWarningOutline className='Icon'/>
                        <p className='Text'>{Rated}</p>
                    </div>

                </section>

                <section className='DetailsOverview'>
                    <div className='OverviewText'>Overview</div>
                    <div className='OverviewPlot'>{Plot}</div>
                </section>

                <section className='DetailsActor'>

                    <div className='IconAndText'>
                        <FaTheaterMasks className='Icone'/>
                        <p className='Text'>Actors</p>
                    </div>
                    <div className='ActorName'> {Actors} </div>
                </section>

                <section className='DetailsCreator'>
                    <div className='Options'>
                        <div className='IconAndText'>
                            <AiOutlineVideoCamera className='Icone'/>
                            <p className='Text'>Director</p>
                        </div>
                        <div className='DirectorName'>{Director}</div>
                    </div>

                    <div className='Options'>
                        <div className='IconAndText'>
                            <RiBallPenLine className='Icone'/>
                            <p className='Text'>Writer</p>
                        </div>
                        <div className='DirectorName'>{Writer}</div>
                    </div>

                    <div className='Options'>
                        <div className='IconAndText'>
                            <BiWorld className='Icone'/>
                            <p className='Text'>Country</p>
                        </div>
                        <div className='DirectorName'>{Country}</div>
                    </div>
                </section>

            </LeftSideDetails>
        </DetailsParent>

    );
};

export default ResultDetailsShow;