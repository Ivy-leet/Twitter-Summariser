import { handlerPath } from "@libs/handler-resolver";

//report generation
export const generateReport = {
    handler: `${handlerPath(__dirname)}/handler.generateReport`,
    description: 'A function that generates a report.',
    events: [
        {
            http: {
                method: 'post',
                path: 'generateReport/',
                cors: true
            },
        },
    ],
};

//report publishing
export const publishReport = {
    handler: `${handlerPath(__dirname)}/handler.publishReport`,
    description: 'A function that publishes a report.',
    events: [
        {
            http: {
                method: 'post',
                path: 'publishReport/',
                cors: true
            },
        },
    ],
};

//retreival of all reports
export const getAllPublishedReports = {
    handler: `${handlerPath(__dirname)}/handler.getAllPublishedReports`,
    description: 'A function that returns all of the reports in the system.',
    events: [
        {
            http: {
                method: 'get',
                path: 'getAllPublishedReports/',
                cors: true
            },
        },
    ],
};

//retrieval of drafts
export const getAllMyDraftReports = {
    handler: `${handlerPath(__dirname)}/handler.getAllMyDraftReports`,
    description: 'A function that returns all the users reports.',
    events: [
        {
            http: {
                method: 'post',
                path: 'getAllMyReports/',
                cors: true
            },
        },
    ],
};

//retrevial of a report
export const getReport = {
    handler: `${handlerPath(__dirname)}/handler.getReport`,
    description: 'A function that returns the content of a specific report.',
    events: [
        {
            http: {
                method: 'post',
                path: 'getReport/',
                cors: true
            },
        },
    ],
};

//cloning of a report
export const cloneReport = {
    handler: `${handlerPath(__dirname)}/handler.cloneReport`,
    description: 'A function that clones a report.',
    events: [
        {
            http: {
                method: 'get',
                path: 'cloneReport/',
                cors: true
            },
        },
    ],
};