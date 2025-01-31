import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { middyfy } from "@libs/lambda";
import { randomUUID } from "crypto";
import { header, statusCodes } from "@functions/resources/APIresponse";
import ServicesLayer from "../../services";

// function for writing and editing text on textBox
export const editBlock = middyfy(
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		try {
			const params = JSON.parse(event.body);

			let text: any;
			let styles: any;

			if (
				!(await ServicesLayer.permissionService.verifyEditor(
					params.reportID,
					params.apiKey
				))
			) {
				return {
					statusCode: statusCodes.unauthorized,
					headers: header,
					body: JSON.stringify("Don't have enough permissions to edit this report.")
				};
			}

			if (params.reportBlockID === undefined) {
				const id = `BK-${randomUUID()}`;
				text = await ServicesLayer.reportBlockService.addReportBlock({
					reportBlockID: id,
					reportID: params.reportID,
					blockType: "RICHTEXT",
					position: params.position,
					richText: params.text
				});
				const sid = `ST-${randomUUID()}`;
				styles = await ServicesLayer.textStyleService.addStyle({
					textStylesID: sid,
					reportBlockID: id,
					align: params.textStyle.Align,
					bold: params.textStyle.Bold,
					colour: params.textStyle.Color,
					italic: params.textStyle.Italic,
					size: params.textStyle.Size
				});
			} else {
				text = await ServicesLayer.reportBlockService.addReportBlock({
					reportBlockID: params.reportBlockID,
					reportID: params.reportID,
					blockType: "RICHTEXT",
					position: params.position,
					richText: params.text
				});
				styles = await ServicesLayer.textStyleService.addStyle({
					textStylesID: params.styleID,
					reportBlockID: params.reportBlockID,
					align: params.textStyle.Align,
					bold: params.textStyle.Bold,
					colour: params.textStyle.Color,
					italic: params.textStyle.Italic,
					size: params.textStyle.Size
				});
			}

			return {
				statusCode: statusCodes.Successful,
				headers: header,
				body: JSON.stringify({ text, styles })
			};
		} catch (e) {
			return {
				statusCode: statusCodes.internalError,
				headers: header,
				body: JSON.stringify(e)
			};
		}
	}
);

// function for writing and editing text on textBox
export const deleteReportBlock = middyfy(
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		try {
			const params = JSON.parse(event.body);

			if (
				await ServicesLayer.permissionService.verifyEditor(params.reportID, params.apiKey)
			) {
				await ServicesLayer.reportBlockService.deleteReportBlock(params.reportBlockID);
			} else {
				return {
					statusCode: statusCodes.unauthorized,
					headers: header,
					body: JSON.stringify("Don't have enough permissions to edit this report.")
				};
			}

			return {
				statusCode: statusCodes.no_content,
				headers: header,
				body: JSON.stringify("")
			};
		} catch (e) {
			return {
				statusCode: statusCodes.internalError,
				headers: header,
				body: JSON.stringify(e)
			};
		}
	}
);
