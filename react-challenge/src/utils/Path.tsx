import Home from '@/challenges/Home/Home';
import { ReactChallengesMap } from "@/types/types";
import Counter from "@/challenges/Counter/Counter";
import Quotegenerator from '@/challenges/Quotegenerator/Quotegenerator';
import MainAccordian from '@/challenges/Accordian/MainAccordian';
import Pagination from '@/challenges/Pagination/Pagination';
import TicTac from '@/challenges/TicTac/TicTac';
import DraggableList from '@/challenges/Drag/Drag';
import Otp from '@/challenges/Otp/Otp';
import Chess from '@/challenges/chess-board/Chess';
import NestedComment from '@/challenges/nested-comments/App';
import TransferListApp from '@/challenges/transfer-list/TransferListApp';
import JsonCreator from '@/challenges/jsonCreator/JsonCreator';
import ProgressBar from '@/challenges/ProgressBar/ProgressBar';
import Calendar from '@/challenges/Calendar/Calendar';
import StarRatingSlide from '@/challenges/StarRating-slide/StarRatingSlide';
import StarRating from '@/challenges/StarRating/StarRating';
import TrafficLight from '@/challenges/Traffic-light/TrafficLight';
import Circles from '@/challenges/circles/Circles';
import Stopwatch from '@/challenges/stopwatch/stopwatch';

export const reactChallengesMap: ReactChallengesMap = {
    '/': <Home />,
    'counter': <Counter />,
    'quoteGenerator' : <Quotegenerator/>,
    'accordian-not-done': <MainAccordian/>,
    'pagination': <Pagination/>,
    'tictac' : <TicTac/>,
    'drag-dop': <DraggableList/>,
    'otp': <Otp/>,
    'chess-board': <Chess/>,
    'nested-comment' : <NestedComment/>,
    'transfer-list': <TransferListApp/>,
    'json-creator': <JsonCreator/>,
    'progress-bar': <ProgressBar/>,
    'calender' : <Calendar/>,
    'star-rating-slide' : <StarRatingSlide/>,
    'star-rating': <StarRating/>,
    'Traffic-Light': <TrafficLight/>,
    'circles': <Circles/>,
    'stopwatch': <Stopwatch/>
};