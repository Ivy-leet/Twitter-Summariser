import { Link } from "react-router-dom";
// import { MdDeleteOutline } from "react-icons/md";
// import Report from "../../resources/Report.png";

// importing link
import link from "../../resources/links.json";

function DraftCard(props: any) {
    // console.log(props);

    const viewGenReport = () => {
        if (localStorage.getItem("draftReportId")) {
            localStorage.removeItem("draftReportId");
            localStorage.setItem("draftReportId", props.data.reportID);
        } else {
            localStorage.setItem("draftReportId", props.data.reportID);
        }
    };

    // const iconStyle3 = { fontSize: "1.5rem", color: "red" };

    const deleteDraftHandler = (event: any) => {
        event.preventDefault();

        const resultDetails = {
            reportID: props.data.reportID,
            apiKey: props.data.apiKey
        };

        deleteDraft(resultDetails);
    };

    // ######################### API FOR DELETING RESULT SET ###############################################

    let deleteDraftEndpoint = process.env.NODE_ENV === 'development' ? String(link.localhostLink) : String(link.serverLink);
    deleteDraftEndpoint += "deleteReport";

    const deleteDraft = (resultInfo: any) => {
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(resultInfo)
        };

        fetch(deleteDraftEndpoint, requestOptions)
            .then(async (response) => {
                const isJson = response.headers.get("content-type")?.includes("application/json");

                isJson && (await response.json());

                // check for error response
                if (!response.ok) {
                    // error

                    return;
                }
            })
            .catch(() => {
            });
    };


    // #######################################################################




    return (
        <div className="p-4 w-full text-center bg-white  border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">{props.data.title}</h1>
            <br></br>
            <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Author: {props.data.author}</p>
            <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Date: {props.data.dateCreated.substring(0, 16)}</p>
            <div className="justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                <Link to="/genReport">
                    <div className="w-full sm:w-auto bg-gray-800 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-400 dark:focus:ring-gray-700">
                        <div className="text-left">
                            <button data-testid="btn-report" type="submit" onClick={viewGenReport}>
                                <p className="font-bold">VIEW REPORT</p>
                            </button>
                        </div>
                    </div>
                </Link>
                <div className="w-full sm:w-auto bg-gray-800 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-400 dark:focus:ring-gray-700">
                    <button data-testid="btn-report" type="submit" onClick={deleteDraftHandler}>
                        <p className="font-bold">DELETE REPORT</p>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DraftCard;

// changeDate(await data.Report.dateCreated.substring(0, 10));
