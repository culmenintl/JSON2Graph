import { FC, useEffect, useState } from "react"
import { Button, Modal } from "react-daisyui"

import { marked } from "marked"

export const ChangelogModal: FC<{}> = () => {
    const { Dialog, handleShow, handleHide } = Modal.useDialog()
    const [changelog, setChangelog] = useState<string>("")

    useEffect(() => {
        fetch("CHANGELOG.md")
            .then((response) => response.text())
            .then((text) => setChangelog(text))
    })

    return (
        <>
            <Button variant="link" onClick={handleShow} className="text-lg">
                {APP_VERSION}
            </Button>
            <Dialog className="prose prose-sm">
                <Modal.Header className="font-bold">Changelog</Modal.Header>
                <Modal.Body
                    // rome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                    dangerouslySetInnerHTML={{ __html: marked(changelog) }}
                />
                <Modal.Actions className="sticky">
                    <Button onClick={handleHide}>Close</Button>
                </Modal.Actions>
            </Dialog>
        </>
    )
}
