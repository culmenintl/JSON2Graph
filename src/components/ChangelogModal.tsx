import { FC, useCallback, useEffect, useRef, useState } from "react"
import { Button, Modal } from "react-daisyui"

import { marked } from "marked"

// Changelog modal component, handles the display of the changelog markdown
export const ChangelogModal: FC<{}> = () => {
    const [changelog, setChangelog] = useState<string>("")

    const ref = useRef<HTMLDialogElement>(null)
    const handleShow = useCallback(() => {
        ref.current?.showModal()
    }, [ref])

    const handleHide = useCallback(() => {
        ref.current?.close()
    }, [ref])

    useEffect(() => {
        fetch("/CHANGELOG.md")
            .then((response) => response.text())
            .then((text) => setChangelog(text))
    })

    return (
        <>
            <Button variant="link" onClick={handleShow} size="xs">
                {APP_VERSION}
            </Button>
            <Modal ref={ref}>
                <Modal.Header className="font-bold">Changelog</Modal.Header>
                <Modal.Body
                    // rome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                    dangerouslySetInnerHTML={{ __html: marked(changelog) }}
                />
                <Modal.Actions className="sticky">
                    <Button onClick={handleHide}>Close</Button>
                </Modal.Actions>
            </Modal>
        </>
    )
}
