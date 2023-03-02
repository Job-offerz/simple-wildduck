import { UserIdentifierModel } from "../../models";

export interface ReferenceModel {
	/**
	 * Mailbox ID
	 */
	mailbox: string;
	/**
	 * Message ID in Mailbox
	 */
	id: number;
	/**
	 * Either reply, replyAll or forward
	 */
	action: string;
}

export interface FromToModel {
	/**
	 * Name of the sender/receiver
	 */
	name?: string;
	/**
	 * Address of the sender/receiver
	 */
	address: string;
}

export interface EnvelopeModel {
	from?: FromToModel;
	/**
	 * Recipients information
	 */
	to?: FromToModel[];
}

export interface AttachmentsModel {
	/**
	 * Base64 encoded attachment content
	 */
	content: string;
	/**
	 * Attachment filename
	 */
	filename?: string;
	/**
	 * MIME type for the attachment file
	 */
	contentType?: string;
	/**
	 * Content-ID value if you want to reference to this
	 * attachment from HTML formatted message
	 */
	cid?: string;
}

export interface SubmitMessageForDeliveryBodyParameterModel
	extends UserIdentifierModel {
	/**
	 * Optional referenced email. If submitted message is
	 * a reply and relevant fields are not provided then
	 * these are resolved from the message to be replied to
	 */
	reference?: ReferenceModel;
	/**
	 * Mailbox ID where to upload the message. If not set
	 * then message is uploaded to Sent Mail folder.
	 */
	mailbox?: string;
	/**
	 * If true then generated message is not added to the sending queue
	 */
	uploadOnly?: boolean;
	/**
	 * If true then treats this message as draft
	 * (should be used with uploadOnly=true)
	 */
	isDraft?: boolean;
	/**
	 * Datestring for delivery if message should be sent
	 * some later time
	 */
	sendTime?: string;
	/**
	 * SMTP envelope. If not provided then resolved either
	 * from message headers or from referenced message
	 */
	envelope?: EnvelopeModel;
	/**
	 * Addresses for the From: header
	 */
	from?: FromToModel;
	/**
	 * Addresses for the To: header
	 */
	to?: FromToModel[];
	/**
	 * Addresses for the Cc: header
	 */
	cc?: FromToModel[];
	/**
	 * Addresses for the Bcc: header
	 */
	bcc?: FromToModel[];
	/**
	 * Message subject. If not then resolved from
	 * Reference message
	 */
	subject: string;
	/**
	 * Plaintext message
	 */
	text: string;
	/**
	 * HTML formatted message
	 */
	html: string;
	/**
	 * Custom headers for the message. If reference
	 * message is set then In-Reply-To and References
	 * headers are set automatically
	 */
	headers?: {
		/**
		 * Header key ('X-Mailer')
		 */
		key: string;
		/**
		 * Header value ('My Awesome Mailing Service')
		 */
		value: string;
	}[];
	/**
	 * Attachments for the message
	 */
	attachments?: AttachmentsModel[];
	/**
	 * Custom metainfo for the message
	 */
	meta?: any;
}

export interface SubmitMessageForDeliveryResponseModel {
	/**
	 * Indicates successful response
	 */
	success: boolean;
	message: {
		/**
		 * Mailbox ID the message was stored to
		 */
		mailbox: string;
		/**
		 * Message ID in Mailbox
		 */
		id: number;
		/**
		 * Queue ID in MTA
		 */
		queueId: string;
	};
}