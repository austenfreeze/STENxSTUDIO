// app/page.tsx

/**
 * Central Hub Homepage
 * This is the root page of your application.
 * It fetches initial data from Sanity and renders the interactive Hub UI.
 * For this initial version, it uses mock data to be runnable out-of-the-box.
 * The next step will be to replace MOCK_DATA with live Sanity queries.
 */

'use client' // This entire page is interactive, so it must be a Client Component.

import React, { useState, useEffect, useRef } from 'react'

// --- MOCK DATA (to be replaced by Sanity fetch) ---
const MOCK_PROJECTS = [
    { _id: 'proj-1', title: 'AI Awareness Video Essay', status: 'inProgress' },
    { _id: 'proj-2', title: 'Social Media Platform v1', status: 'planning' },
];
const MOCK_LOGS = [
    { _id: 'log-1', title: 'Session on 2025-06-21', sessionDate: new Date('2025-06-21T10:30:00'), summary: 'Initial brainstorming for the Hub prototype. Discussed core principles: Longitudinal Storytelling through Real-Time Nodes. Decided to build a prototype first before committing to a tech stack.', relatedProject: { _ref: 'proj-2'} },
    { _id: 'log-2', title: 'Session on 2025-06-20', sessionDate: new Date('2025-06-20T15:00:00'), summary: 'Researched historical precedents for media-driven events, focusing on War of the Worlds and its modern parallels.', relatedProject: { _ref: 'proj-1'} },
];
const MOCK_NODES = [
    { _id: 'node-1', title: 'Orson Welles\' War of the Worlds', nodeType: 'event', creationDate: new Date('2025-06-18T14:00:00'), content: 'A key historical precedent for mass hysteria via media.', connectedNodes: [{_ref: 'node-2'}], relatedProject: {_ref: 'proj-1'} },
    { _id: 'node-2', title: 'Google Veo Release', nodeType: 'event', creationDate: new Date('2025-05-15T09:00:00'), content: 'Marked a significant leap in hyper-realistic video generation.', connectedNodes: [], relatedProject: {_ref: 'proj-1'} },
    { _id: 'node-3', title: 'Principle of Longitudinal Storytelling', nodeType: 'thought', creationDate: new Date('2025-06-21T11:00:00'), content: 'Core idea for the new platform: turn the feed into a tapestry.', connectedNodes: [], relatedProject: {_ref: 'proj-2'} },
    { _id: 'node-4', title: 'The 2015 "Dress" Phenomenon', nodeType: 'event', creationDate: new Date('2015-02-26T18:00:00'), content: 'A cultural moment that highlighted subjectivity in digital perception.', connectedNodes: [{_ref: 'node-1'}], relatedProject: {_ref: 'proj-1'} },
];
// --- END MOCK DATA ---


// --- ICONS (using inline SVGs to keep it self-contained) ---
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const ZapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>;
const BookOpenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>;
const ActivityIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>;
const LinkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const CompassIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>;
const FilterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46V19l4 2v-8.54L22 3z"></polygon></svg>;

const generateId = () => `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// --- UI COMPONENTS ---

const Modal = ({ children, onClose, size = '2xl' }) => (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
        <div className={`bg-zinc-900 rounded-2xl shadow-2xl p-6 relative max-w-${size} w-full max-h-[90vh] overflow-y-auto border border-zinc-800`}>
            <button onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-100 transition-colors">
                <XIcon />
            </button>
            {children}
        </div>
    </div>
);

const NodeForm = ({ onSave, onClose, allNodes, existingNode, projects }) => {
    const [title, setTitle] = useState(existingNode?.title || '');
    const [nodeType, setNodeType] = useState(existingNode?.nodeType || 'thought');
    const [content, setContent] = useState(existingNode?.content || '');
    const [relatedProject, setRelatedProject] = useState(existingNode?.relatedProject?._ref || '');
    const [connections, setConnections] = useState(existingNode?.connectedNodes?.map(c => c._ref) || []);
    
    const handleSave = () => {
        if (!title.trim()) {
            alert("Title is required.");
            return;
        }
        onSave({ 
            _id: existingNode?._id || generateId(),
            title, 
            nodeType, 
            content, 
            relatedProject: relatedProject ? { _ref: relatedProject } : undefined,
            connectedNodes: connections.map(_ref => ({ _ref, _type: 'reference' })),
            creationDate: existingNode?.creationDate || new Date(),
        });
        onClose();
    };
    
    const toggleConnection = (nodeId) => {
        setConnections(prev => prev.includes(nodeId) ? prev.filter(id => id !== nodeId) : [...prev, nodeId]);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-zinc-100 mb-6">{existingNode ? 'Edit Node' : 'Create New Node'}</h2>
            <div className="space-y-4">
                <input type="text" placeholder="Node Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-zinc-950 border border-zinc-700 text-zinc-100 rounded-lg p-3 focus:ring-2 focus:ring-slate-500 outline-none" />
                <select value={nodeType} onChange={e => setNodeType(e.target.value)} className="w-full bg-zinc-950 border border-zinc-700 text-zinc-100 rounded-lg p-3 focus:ring-2 focus:ring-slate-500 outline-none">
                    <option value="thought">Fleeting Thought</option>
                    <option value="event">Key Event</option>
                    <option value="source">Source/Link</option>
                    <option value="socialPost">Social Media Post</option>
                    <option value="output">Creative Output</option>
                </select>
                <textarea placeholder="Content..." value={content} onChange={e => setContent(e.target.value)} rows="4" className="w-full bg-zinc-950 border border-zinc-700 text-zinc-100 rounded-lg p-3 focus:ring-2 focus:ring-slate-500 outline-none"></textarea>
                 <select value={relatedProject} onChange={e => setRelatedProject(e.target.value)} className="w-full bg-zinc-950 border border-zinc-700 text-zinc-100 rounded-lg p-3 focus:ring-2 focus:ring-slate-500 outline-none">
                    <option value="">No Related Project</option>
                    {projects.map(p => <option key={p._id} value={p._id}>{p.title}</option>)}
                </select>
            </div>
            <div className="mt-6">
                <h3 className="text-lg font-semibold text-zinc-300 mb-3">Connect to other nodes:</h3>
                <div className="max-h-48 overflow-y-auto space-y-2 p-2 bg-zinc-950 rounded-lg border border-zinc-700">
                    {allNodes.filter(n => n._id !== existingNode?._id).map(node => (
                        <div key={node._id} className="flex items-center">
                            <input type="checkbox" id={`conn-${node._id}`} checked={connections.includes(node._id)} onChange={() => toggleConnection(node._id)} className="w-4 h-4 text-slate-600 bg-zinc-700 border-zinc-600 rounded focus:ring-slate-500 ring-offset-zinc-800 focus:ring-2"/>
                            <label htmlFor={`conn-${node._id}`} className="ml-2 text-sm font-medium text-zinc-300">{node.title}</label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-end space-x-3 mt-8">
                <button onClick={onClose} className="px-4 py-2 rounded-lg bg-zinc-700 text-zinc-200 hover:bg-zinc-600 transition-colors">Cancel</button>
                <button onClick={handleSave} className="px-6 py-2 rounded-lg bg-slate-700 text-zinc-50 font-semibold hover:bg-slate-600 transition-colors">Save</button>
            </div>
        </div>
    );
};

const LogDetailModal = ({ log, onClose, project }) => (
    <Modal onClose={onClose} size="lg">
        <h2 className="text-2xl font-bold text-zinc-100 mb-2">{log.title}</h2>
        <p className="text-sm text-zinc-400 mb-4">{log.sessionDate.toLocaleString()}</p>
        {project && <p className="mb-4 text-sm"><span className="font-semibold text-zinc-300">Related Project:</span> <span className="text-emerald-400">{project.title}</span></p>}
        <div className="prose prose-invert prose-p:text-zinc-300 prose-p:leading-relaxed">
            <p>{log.summary}</p>
        </div>
         <div className="flex justify-end mt-6">
            <button onClick={onClose} className="px-6 py-2 rounded-lg bg-slate-700 text-zinc-50 font-semibold hover:bg-slate-600 transition-colors">Close</button>
        </div>
    </Modal>
);

const WorkspaceView = ({ projects, logs, nodes, setNodes, selectedFilter, setSelectedFilter, allNodesForForm }) => {
    const [modalContent, setModalContent] = useState(null);

    const saveNode = (nodeData) => {
        setNodes(prev => {
            const index = prev.findIndex(n => n._id === nodeData._id);
            if (index > -1) {
                const newNodes = [...prev];
                newNodes[index] = nodeData;
                return newNodes;
            }
            return [nodeData, ...prev];
        });
    };
    
    const getProjectForLog = (log) => projects.find(p => p._id === log.relatedProject._ref);

    return (
        <div className="p-4 sm:p-8 space-y-8 h-full flex flex-col">
            {modalContent === 'newNode' && (
                <Modal onClose={() => setModalContent(null)}>
                    <NodeForm onSave={saveNode} onClose={() => setModalContent(null)} allNodes={allNodesForForm} projects={projects} />
                </Modal>
            )}
            
            {modalContent?.type === 'editNode' && (
                 <Modal onClose={() => setModalContent(null)}>
                    <NodeForm onSave={saveNode} onClose={() => setModalContent(null)} allNodes={allNodesForForm} existingNode={modalContent.node} projects={projects}/>
                </Modal>
            )}
            
            {modalContent?.type === 'viewLog' && (
                <LogDetailModal log={modalContent.log} project={getProjectForLog(modalContent.log)} onClose={() => setModalContent(null)} />
            )}

            <div className="flex justify-between items-center flex-shrink-0">
                <h1 className="text-3xl font-bold text-zinc-100">Workspace</h1>
                <button onClick={() => setModalContent('newNode')} className="flex items-center space-x-2 px-4 py-2 bg-slate-700 text-zinc-50 rounded-lg font-semibold hover:bg-slate-600 transition-transform hover:scale-105 shadow-lg">
                    <PlusIcon />
                    <span>New Node</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-grow overflow-hidden">
                <div className="lg:col-span-2 space-y-6 flex flex-col h-full overflow-hidden">
                    <div className="flex justify-between items-center flex-shrink-0">
                        <h2 className="text-2xl font-semibold text-zinc-200 flex items-center"><ZapIcon className="mr-3 text-amber-500" />Nodes</h2>
                        {selectedFilter && <span className="text-sm bg-zinc-800 text-slate-300 px-3 py-1 rounded-full flex items-center"><FilterIcon className="mr-2"/>Filtered</span>}
                    </div>
                    <div className="space-y-4 overflow-y-auto pr-2 flex-grow">
                        {nodes.map(node => (
                            <div key={node._id} onClick={() => setModalContent({type: 'editNode', node})} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 cursor-pointer hover:border-slate-700 hover:bg-zinc-800/50 transition-all shadow-md">
                                <p className="font-bold text-zinc-100">{node.title}</p>
                                <p className="text-sm text-zinc-400 truncate">{node.content}</p>
                                <div className="flex items-center justify-between mt-3 text-xs">
                                    <span className="px-2 py-1 bg-zinc-800 text-zinc-300 rounded-full">{node.nodeType}</span>
                                    <div className="flex items-center space-x-2">
                                    {node.connectedNodes?.length > 0 && 
                                        <span className="flex items-center text-slate-400"><LinkIcon /><span className="ml-1">{node.connectedNodes.length}</span></span>
                                    }
                                    <span className="text-zinc-500">{node.creationDate.toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                         {nodes.length === 0 && (
                            <div className="text-center py-10 text-zinc-500">
                                <p>No nodes found for this filter.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-8 flex flex-col h-full overflow-hidden">
                    <div className="flex-shrink-0">
                        <h2 className="text-2xl font-semibold text-zinc-200 mb-4 flex items-center"><CompassIcon className="mr-3 text-emerald-500"/>Projects</h2>
                        <div className="space-y-3">
                            <button onClick={() => setSelectedFilter(null)} className={`w-full text-left p-3 rounded-lg border transition-colors ${selectedFilter === null ? 'bg-slate-700 border-slate-600 text-zinc-50' : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'}`}>
                                <p className="font-semibold">All Nodes</p>
                            </button>
                            {projects.map(proj => (
                                <button key={proj._id} onClick={() => setSelectedFilter(proj._id)} className={`w-full text-left p-3 rounded-lg border transition-colors ${selectedFilter === proj._id ? 'bg-slate-700 border-slate-600 text-zinc-50' : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'}`}>
                                    <p className="font-semibold text-zinc-100">{proj.title}</p>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${proj.status === 'inProgress' ? 'bg-emerald-900 text-emerald-400' : 'bg-amber-900 text-amber-400'}`}>{proj.status}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col flex-grow overflow-hidden">
                        <h2 className="text-2xl font-semibold text-zinc-200 mb-4 flex-shrink-0"><BookOpenIcon className="mr-3 text-violet-500" />Logs</h2>
                         <div className="space-y-3 overflow-y-auto pr-2 flex-grow">
                             {logs.map(log => (
                                <button key={log._id} onClick={() => setModalContent({type: 'viewLog', log})} className="w-full text-left bg-zinc-900 p-3 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
                                    <p className="font-semibold text-zinc-100">{log.title}</p>
                                    <p className="text-sm text-zinc-400">{log.sessionDate.toLocaleString()}</p>
                                </button>
                            ))}
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TapestryView = ({ nodes, projects }) => {
    const canvasRef = useRef(null);
    const [positions, setPositions] = useState({});
    const [draggedNode, setDraggedNode] = useState(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const getProjectColor = (projectId) => {
        const project = projects.find(p => p._id === projectId);
        if (!project) return '#3f3f46'; // zinc-700
        const index = projects.indexOf(project);
        const colors = ['#1e40af', '#166534', '#b45309', '#6d28d9']; // Muted: blue-800, green-800, amber-700, violet-700
        return colors[index % colors.length];
    }
    
    useEffect(() => {
        if (!canvasRef.current || !nodes) return;
        const newPositions = {};
        const { width, height } = canvasRef.current.getBoundingClientRect();
        
        const positionedNodes = Object.keys(positions);
        const unpositionedNodes = nodes.filter(n => !positionedNodes.includes(n._id));

        unpositionedNodes.forEach(node => {
             newPositions[node._id] = {
                x: Math.random() * (width > 200 ? width - 200 : width),
                y: Math.random() * (height > 100 ? height - 100 : height),
            };
        });
        
        setPositions(prev => ({...prev, ...newPositions}));

    }, [nodes]);

    const handleMouseDown = (e, nodeId) => {
        if (e.button !== 0) return;
        setDraggedNode(nodeId);
        const pos = positions[nodeId];
        setOffset({
            x: e.clientX - pos.x,
            y: e.clientY - pos.y,
        });
    };

    const handleMouseMove = (e) => {
        if (draggedNode && positions[draggedNode]) {
            setPositions(prev => ({
                ...prev,
                [draggedNode]: {
                    x: e.clientX - offset.x,
                    y: e.clientY - offset.y,
                }
            }));
        }
    };

    const handleMouseUp = () => {
        setDraggedNode(null);
    };

    return (
        <div className="w-full h-full bg-zinc-950 text-zinc-100 relative overflow-hidden" 
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <div className="absolute top-4 left-4 p-4 bg-zinc-900/80 backdrop-blur-sm rounded-xl border border-zinc-800 z-10">
                <h1 className="text-2xl font-bold">The Tapestry</h1>
                <p className="text-sm text-zinc-400">Visualizing the flow of ideas.</p>
            </div>
            
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5"
                        markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#52525b" /> 
                    </marker>
                </defs>
                {nodes.map(node => 
                    node.connectedNodes?.map(conn => {
                        const connId = conn._ref;
                        const start = positions[node._id];
                        const end = positions[connId];
                        if (!start || !end || !nodes.find(n => n._id === connId)) return null;
                        return (
                            <line 
                                key={`${node._id}-${connId}`}
                                x1={start.x + 80} y1={start.y + 25}
                                x2={end.x + 80} y2={end.y + 25}
                                stroke="#404040" // zinc-700
                                strokeWidth="1.5"
                                markerEnd="url(#arrow)"
                            />
                        )
                    })
                )}
            </svg>

            {nodes.map(node => {
                const pos = positions[node._id];
                if (!pos) return null;
                const projectColor = getProjectColor(node.relatedProject?._ref);

                return (
                    <div 
                        key={node._id} 
                        className="absolute w-40 p-3 rounded-lg shadow-xl cursor-grab active:cursor-grabbing transition-all duration-100 ease-in-out select-none"
                        style={{ 
                            transform: `translate(${pos.x}px, ${pos.y}px)`,
                            backgroundColor: '#18181b', // zinc-900
                            border: '1px solid #27272a', // zinc-800
                            borderLeft: `4px solid ${projectColor}`
                        }}
                        onMouseDown={e => handleMouseDown(e, node._id)}
                    >
                        <p className="font-bold text-sm truncate text-zinc-200">{node.title}</p>
                        <p className="text-xs text-zinc-400 mt-1">{node.nodeType}</p>
                    </div>
                )
            })}
        </div>
    );
};


// --- The Main App Component ---
// This component orchestrates the state and views
const HubApp = ({ initialProjects, initialLogs, initialNodes }) => {
    const [view, setView] = useState('workspace'); 
    const [projects, setProjects] = useState(initialProjects || []);
    const [logs, setLogs] =useState(initialLogs.map(log => ({...log, sessionDate: new Date(log.sessionDate)})) || []);
    const [allNodes, setAllNodes] = useState(initialNodes.map(node => ({...node, creationDate: new Date(node.creationDate)})) || []);
    const [selectedFilter, setSelectedFilter] = useState(null); 

    const filteredNodes = selectedFilter 
        ? allNodes.filter(node => node.relatedProject?._ref === selectedFilter)
        : allNodes;
    
    // In a real app, the `setAllNodes` function would also trigger a mutation to Sanity.
    // For now, it just manages client-side state.

    return (
        <div className="bg-zinc-950 text-zinc-200 font-sans w-full min-h-screen flex flex-col antialiased">
             <header className="w-full bg-zinc-900/70 backdrop-blur-sm border-b border-zinc-800 z-20 flex-shrink-0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-3">
                        {/* Empty div for spacing, assuming your layout has Header/Footer outside this page */}
                    </div>
                </div>
            </header>
            <div className="flex-grow w-full h-full overflow-hidden">
                {view === 'workspace' ? 
                    <WorkspaceView 
                        projects={projects} 
                        logs={logs} 
                        nodes={filteredNodes} 
                        setNodes={setAllNodes} 
                        selectedFilter={selectedFilter}
                        setSelectedFilter={setSelectedFilter}
                        allNodesForForm={allNodes} // Pass all nodes to the form for connection selection
                    /> : 
                    <TapestryView nodes={filteredNodes} projects={projects} />}
            </div>
        </div>
    )
}

// This is the default export for the page.
// It uses mock data for now.
export default function HomePage() {
  const initialProjects = MOCK_PROJECTS;
  const initialLogs = MOCK_LOGS;
  const initialNodes = MOCK_NODES;

  return <HubApp initialProjects={initialProjects} initialLogs={initialLogs} initialNodes={initialNodes} />
}
