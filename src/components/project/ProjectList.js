import { useSelector,useDispatch } from "react-redux";
import ProjectItem from "./ProjectItem";
import { useEffect } from "react";
import { selectAllProjects,getProjectError,getProjectStatus,fetchProjects } from "./projectSlice";


function ProjectList(){
    const dispatch = useDispatch();

    const projects = useSelector(selectAllProjects);
    const projectStatus = useSelector(getProjectStatus);
    const error = useSelector(getProjectError);

    useEffect(()=>{
        if(projectStatus === 'idle')
            dispatch(fetchProjects())



    },[projectStatus,dispatch]
    );
    let content;

    if(projectStatus === 'loading'){
        content = (<p>Loading...</p>);
    }
    if(projectStatus === 'succeeded'){
        content = projects.map(
            (project) => (
                    <ProjectItem 
                    id={project.projectIdentifier}
                    projectName = {project.projectName}
                    description = {project.description}
                    startDate = {project.startDate}
                    endDate = {project.endDate}
                     />)
            
        );
    }
    if(projectStatus === 'failed'){
        content = (<p>{error}</p>)
    }


    return content;

}

export default ProjectList;