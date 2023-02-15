import { useState } from "react"
import styles from "./CodeBar.module.css"
import HtmlEditor from 'components/Editor/HtmlEditor'
import CssEditor from 'components/Editor/CssEditor'
import JsEditor from 'components/Editor/JsEditor'

function CodeBar() {

	const [activeTab, setActiveTab] = useState('html')

	return (
		<div className={styles.codebar} style={{width: 600}}>
			<nav className={styles.tab}>
				<button 
					onClick={() => setActiveTab('html')} 
					className={`${styles.item} ${activeTab === 'html' ? styles.activeTab : ''}`}>
						HTML
				</button>
				<button 
					onClick={() => setActiveTab('css')} 
					className={`${styles.item} ${activeTab === 'css' ? styles.activeTab : ''}`}>
						CSS
				</button>
				<button 
					onClick={() => setActiveTab('js')} 
					className={`${styles.item} ${activeTab === 'js' ? styles.activeTab : ''}`}>
						JS
				</button>
			</nav>
			<div className={styles.editor}>
				{activeTab === 'html' ? <HtmlEditor /> : null}
				{activeTab === 'css' ? <CssEditor /> : null}
				{activeTab === 'js' ? <JsEditor /> : null}
			</div>
		</div>
	)
}

export default CodeBar