// import QuestionDetail from '../../../../userComponents/detailQuestion';

// const QuestionPage = ({params}:{params:
//     {
//     id:string
// }

// }) => {
//     const {id}=params;
//     return <QuestionDetail id={id} />;
// };

// export default QuestionPage;
import QuestionDetail from '../../../../userComponents/detailQuestion';

const QuestionPage = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    return <QuestionDetail id={id} />;
};

export default QuestionPage;
