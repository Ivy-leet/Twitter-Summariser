import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Permission from "@model/permission/permissions.model";

export default class PermissionService {
	private TableName = "PermissionTable";

	constructor(private docClient: DocumentClient) {}

	async getPermission(id: string, key: string): Promise<Permission> {
		const result = await this.docClient
			.get({
				TableName: this.TableName,
				Key: { reportID: id, apiKey: key }
			})
			.promise();

		return result.Item as Permission;
	}

	async addPermission(permission: Permission): Promise<Permission> {
		await this.docClient
			.put({
				TableName: this.TableName,
				Item: permission
			})
			.promise();

		return permission as Permission;
	}

	// verify report retrieval
	async verifyReportRetr(status: string, apiKey: string, reportID: string): Promise<boolean> {
		const per = await this.getPermission(reportID, apiKey);
		if (status !== "PUBLISHED" && per === undefined) {
			return true;
		}
		return false;
	}

	// verify editoral rights of report
	async verifyEditor(reportID: string, apiKey: string): Promise<boolean> {
		const per = await this.getPermission(reportID, apiKey);

		return per.type === "OWNER" || per.type === "EDITOR";
	}

	async getPermissions(key: string): Promise<Permission[]> {
		const result = await this.docClient
			.query({
				TableName: this.TableName,
				IndexName: "permissionIndex",
				KeyConditionExpression: "apiKey = :apiKey",
				ExpressionAttributeValues: {
					":apiKey": key
				}
			})
			.promise();

		return result.Items as Permission[];
	}

	// verify owner of report
	async verifyOwner(reportID: string, apiKey: string): Promise<boolean> {
		const per = await this.getPermission(reportID, apiKey);

		return per.type === "OWNER";
	}

	async updatePermission(id: string, key: string, perm: string): Promise<Permission> {
		const result = await this.docClient
			.update({
				TableName: this.TableName,
				Key: {
					reportID: id,
					apiKey: key
				},
				UpdateExpression: "SET type = :type",
				ExpressionAttributeValues: {
					":type": perm
				}
			})
			.promise();

		return result.Attributes as Permission;
	}

	async deletePermission(id: string, key: string) {
		await this.docClient
			.delete({
				TableName: this.TableName,
				Key: {
					reportID: id,
					apiKey: key
				}
			})
			.promise();
	}
}
