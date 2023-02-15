import { useMemo } from 'react'
import {EditorContext, useContext} from 'context/context'
import styles from "./Preview.module.css"

function Preview() {

	const {html, css, js} = useContext(EditorContext)

	const srcDocument = useMemo( () => {
		if (!html && !css && !js) return 
		return `<!doctype html>
				<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport"
						content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
					<meta http-equiv="X-UA-Compatible" content="ie=edge">
					<title>Document</title>
					<style>
					${css}
					</style>
				</head>
				<body>
					${html}
					<script>
					${js}
					</script>
				</body>
				</html>`
	}, [html, css, js])

	return (
		<div className={styles.content}>
			{
				srcDocument ?  <iframe title="preview" className={styles.preview} srcDoc={srcDocument} />
				: <div className={styles.previewLoading}>Your code will be displayed here</div>  
			}
		</div>
	)
}

export default Preview