import Head from "next/head";
import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TbHomeFilled } from "react-icons/tb";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Lagend, LineController, Legend, plugins } from "chart.js";
import { Bar, Chart } from "react-chartjs-2";
import Loading from "../../Components/Loading";

export default function Home() {



  const { data: session, status } = useSession();

  const router = useRouter();
  // check if there's no active session and redirect to login page
  useEffect(() => {
    // check if there's no active session and redirect to login page
    if (!session) {
      router.push('/login')
    }
  }, [session, router]);

  if (status === "loading") {
    // loading state, loader or any other indicator
    return <div className="loadingdata flex flex-col flex-center wh_100">
      <Loading />
      <h1>Loading...</h1>
    </div>
  }

  ChartJS.register(CategoryScale, LineController, LinearScale, BarElement, Title, Tooltip, Legend);

  // use this on top for render error
  const [blogsData, setBlogsData] = useState();

  // define options within the component scope

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Blogs Created Monthly By Year'
      }
    }
  }

  useEffect(() => {
    // fetch data from api
    const fetchData = async () => {
      try {
        const response = await fetch('/api/blogapi');
        const data = await response.json();
        setBlogsData(data); // assuming data is an array of the blog objects
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }

    fetchData();
  }, [])


  // Aggregate data by year and month
  const monthlydata = blogsData
    ? blogsData
      .filter(dat => dat.status === "publish")
      .reduce((acc, blog) => {
        const year = new Date(blog.createdAt).getFullYear(); // get the year
        const month = new Date(blog.createdAt).getMonth(); // get the month (0 indexed)
        acc[year] = acc[year] || Array(12).fill(0); // initialize array for the year if not exists

        acc[year][month]++; // increment count for the month
        return acc;
      }, {})
    : {}; // if blogsData is undefined, return an empty object



  const currentYear = new Date().getFullYear(); // get the current year
  const years = Object.keys(monthlydata);
  const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const datasets = years.map(year => ({
    label: `${year}`,
    data: monthlydata[year] || Array(12).fill(0), // if no data for a month, default to 0
    backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`
  }))

  const data = {
    labels,
    datasets
  }



  if (session) {
    return (
      <>
        <Head>
          <title>Admin Dashboard</title>
          <meta name="description" content="admin dashboard next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>


        <div className="dashboard">
          {/* title dashboard*/}
          <div className="titledashboard flex flex-sb">
            <div   data-aos="fade-right">
              <h2>Blogs <span>Dashboard</span></h2>
              <h3>ADMIN PANEL</h3>
            </div>
            <div className="breadcrumb"   data-aos="fade-left">
              <TbHomeFilled /> <span>/</span> <span>Dashboard</span>
            </div>
          </div>

          {/* dashboard four cards */}
          <div className="topfourcards flex flex-sb">
            <div className="four_card" data-aos="fade-right">
              <h2>Total Blogs</h2>
              <span>{blogsData ? blogsData.filter(ab => ab.status === "publish").length : 0}</span>
            </div>

            <div className="four_card" data-aos="fade-right">
              <h2>Total Topics</h2>
              <span>4</span>
            </div>

            <div className="four_card" data-aos="fade-left">
              <h2>Total Tags</h2>
              <span>6</span>
            </div>

            <div className="four_card" data-aos="fade-left">
              <h2>Draft Blogs</h2>
              <span>{blogsData ? blogsData.filter(ab => ab.status === "draft").length : 0}</span>
            </div>
          </div>

          {/* year overview */}
          <div className="year_overview flex flex-sb" data-aos="fade-up">
            <div className="leftyearoverview">
              <div className="flex flex-sb">
                <h3>Year Overview</h3>
                
                <h3 className="text-right">{blogsData ? blogsData.filter(ab => ab.status === "publish").length : 0} / 365<br /> <span>Total Published </span> </h3>
              </div>

              <Bar data={data} options={options} />

            </div>
            <div className="right_salescont">
              <div>
                <h3>Blogs By Category</h3>
                
              </div>

              <div className="blogscategory flex flex-center">
                <table>
                  <thead>
                    <tr>
                      <td>Topics</td>
                      <td>Data</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Web Development</td>
                      <td>10</td>
                    </tr>

                    <tr>
                      <td>Tech Stack</td>
                      <td>10</td>
                    </tr>

                    <tr>
                      <td>Machine Learning & AI</td>
                      <td>10</td>
                    </tr>

                    <tr>
                      <td>Other</td>
                      <td>10</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      </>
    );
  }

}
