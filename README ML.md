# Machine Learning Development Life Cycle (MLDLC) – Notes

## What is MLDLC?

* MLDLC stands for **Machine Learning Development Life Cycle**
* It is similar to **SDLC (Software Development Life Cycle)** but specifically for **ML-based products**
* It provides **step-by-step guidelines** from idea to production deployment
* Goal: build **real-world, production-ready ML systems**, not just models with accuracy

---

## Why is MLDLC Important?

* Most beginners stop after **training a model and checking accuracy**
* In real companies, interviewers expect **end-to-end ML product experience**
* MLDLC helps you:

  * Avoid rework and cost overruns
  * Build scalable, maintainable ML systems
  * Convert ML models into usable software products

---

## Total Stages in MLDLC

> Number of steps may vary slightly across resources, but the **core idea remains the same**

---

## 1. Problem Framing (Problem Definition)

* Clearly define **what problem you are solving**
* Decide:

  * Business objective
  * ML type (Supervised / Unsupervised / Reinforcement)
  * Regression or Classification
  * Batch or Real-time prediction
  * Success metrics
* Understand:

  * Cost
  * Timeline
  * Team size
  * Data availability

📌 *A poorly framed problem leads to wasted effort later*

---

## 2. Data Collection

* Machine Learning **cannot work without data**
* Data sources can be:

  * CSV files
  * APIs
  * Web scraping
  * Databases
  * Data warehouses (ETL: Extract, Transform, Load)
  * Big data systems (HDFS, Cloud storage)
* Production systems usually **do not have clean data readily available**

---

## 3. Data Processing (Data Cleaning & Preprocessing)

* Real-world data is often **dirty**
* Common tasks:

  * Remove duplicates
  * Handle missing values
  * Remove outliers
  * Fix inconsistent formats
  * Feature scaling (Normalization / Standardization)
* Goal: Make data **ML-algorithm friendly**

---

## 4. Exploratory Data Analysis (EDA)

* Understand your data deeply before modeling
* Tasks include:

  * Univariate analysis (single feature)
  * Bivariate analysis (feature vs target)
  * Multivariate analysis
  * Data visualization (graphs, plots)
  * Detect class imbalance
* Helps uncover:

  * Hidden patterns
  * Relationships
  * Data issues

📌 *More time spent in EDA = fewer mistakes later*

---

## 5. Feature Engineering & Feature Selection

### Feature Engineering

* Create **new meaningful features**
* Example:

  * Instead of rooms + bathrooms → create `area (sqft)`
* Improves model performance and simplicity

### Feature Selection

* Remove unnecessary or irrelevant features
* Benefits:

  * Faster training
  * Reduced overfitting
  * Better generalization

---

## 6. Model Training

* Train **multiple algorithms**, not just one
* Different algorithms perform differently on different datasets
* Try models from different families
* Train models using prepared data

---

## 7. Model Evaluation

* Evaluate models using **performance metrics**
* Metrics depend on problem type:

  * Classification: Accuracy, Precision, Recall, F1-score, ROC-AUC
  * Regression: MAE, MSE, RMSE, R²
* Purpose:

  * Compare models
  * Select the best-performing one

---

## 8. Model Selection & Hyperparameter Tuning

* Select the **best model**
* Tune hyperparameters to improve performance
* Example:

  * Learning rate
  * Tree depth
  * Number of estimators
* Similar to tuning TV settings for best output

---

## 9. Ensemble Learning (Optional but Powerful)

* Combine multiple models to create a **stronger model**
* Techniques:

  * Bagging
  * Boosting
  * Stacking
* Often gives **better accuracy and robustness**

---

## 10. Model Deployment

* Convert trained model into a **binary/serialized file**
* Expose it via:

  * API (REST)
  * Web app
  * Mobile app
* Common tools:

  * Flask / FastAPI
  * Cloud platforms (AWS, GCP, Azure)
* Users interact via UI → API → Model → Response

---

## 11. Testing (Beta Testing & A/B Testing)

* Release model to limited users first
* Collect feedback
* Detect:

  * Performance issues
  * Data mismatch
  * Prediction errors
* If issues occur → go back to previous stages

---

## 12. Monitoring, Optimization & Maintenance

* Monitor model performance continuously
* Handle:

  * Data drift
  * Concept drift
* Decide:

  * Retraining frequency
  * Automation pipelines
* Backup models and data
* Optimize:

  * Cost
  * Latency
  * Scalability
* Use load balancing and automation

---

## Key Takeaways

* MLDLC is **not just about training a model**
* Real ML work = **data + engineering + deployment + monitoring**
* Interviews and real projects expect **ML product mindset**
* Every ML engineer must understand **end-to-end lifecycle**


<br>
<br>

# Career Options in Machine Learning (After Learning ML)

## Why This Video / Topic?

* Many students learn Machine Learning but get **confused while job searching**
* On job portals, you see **different job titles**, not just “Machine Learning Engineer”
* This creates confusion:

  * What role should I apply for?
  * What skills are required?
* This confusion happens because **one person cannot do the entire ML process in real companies**

---

## Root Cause of Different Job Roles

* ML products follow the **Machine Learning Development Life Cycle (MLDLC)**
* MLDLC has multiple stages:

  * Data collection
  * Data processing
  * Analysis
  * Modeling
  * Deployment
  * Monitoring
* In **big companies**, each stage is handled by **different specialists**
* Hence, **different job profiles exist**

---

## Main Job Profiles in ML Field

There are **4 core job roles**:

1. Data Engineer
2. Data Analyst
3. Data Scientist
4. Machine Learning Engineer

---

# 1. Data Engineer

## Role Overview

* Works at the **starting point** of the ML lifecycle
* Responsible for **bringing data to the table**
* Without Data Engineers, ML teams **cannot function**

## Key Responsibilities

* Collect data from:

  * Company databases
  * APIs
  * Logs
  * Third-party sources
  * Web scraping
* Build **Data Warehouses** from production databases
* Separate:

  * OLTP (Online Transaction Processing – live databases)
  * OLAP (Analytics databases)
* Create and maintain:

  * Data pipelines
  * ETL pipelines
  * APIs for data access
* Ensure:

  * Data reliability
  * Data availability
  * Performance
* Maintain databases and pipelines continuously

## Why Data Engineers Are Highly Paid

* Data is **gold**
* Very few people have strong Data Engineering skills
* Hard-core software + infrastructure role
* Huge demand, low supply

## Required Skills

* Strong **software engineering background**
* Databases:

  * SQL & NoSQL
* Programming:

  * Python / Java / Scala
* Big Data tools:

  * Apache Spark
  * Hadoop
* Cloud platforms:

  * AWS / GCP / Azure
* Distributed systems
* System design
* Workflow tools:

  * Airflow, etc.

📌 *Best for people who love backend, systems, and infrastructure*

---

# 2. Data Analyst

## Role Overview

* Focuses on **understanding past data**
* Answers:

  * What happened?
  * Why did it happen?
* Acts as a **bridge between data and business**

## Key Responsibilities

* Clean and organize data
* Perform data analysis
* Generate insights from data
* Create dashboards and visualizations
* Prepare reports for:

  * Managers
  * Stakeholders
* Explain findings in **simple language**
* Help business teams take decisions

## Required Skills

* Statistics (basic to intermediate)
* SQL
* Excel
* Data visualization tools:

  * Tableau
  * Power BI
* Programming:

  * Python (basic)
* Strong **communication skills**
* Domain knowledge (finance, sales, healthcare, etc.)
* Data storytelling (very important)

📌 *Best for people who enjoy analysis + communication*

---

# 3. Data Scientist

## Role Overview

* Most **versatile role**
* Combines:

  * Statistics
  * Machine Learning
  * Programming
  * Business understanding
* Works on **future predictions**

## What Makes Data Scientist Different?

* Data Analyst → looks at the **past**
* Data Scientist → predicts the **future**

## Key Responsibilities

* Understand business problems
* Analyze and clean data
* Perform feature engineering
* Build ML models
* Tune and evaluate models
* Create solutions like:

  * Recommendation systems
  * Fraud detection
  * Demand forecasting
  * Optimization systems

## Skills Required

* Statistics & Probability
* Machine Learning algorithms
* Python / R
* Data preprocessing & EDA
* Feature engineering
* Model evaluation
* Communication skills
* Business understanding

📌 *In startups, Data Scientists often do everything end-to-end*

---

# 4. Machine Learning Engineer (MLE)

## Role Overview

* Focuses on **production**
* Bridges gap between:

  * Data Scientists
  * Software Engineers
* Makes ML models **usable in real applications**

## Key Responsibilities

* Deploy ML models to:

  * Web apps
  * Mobile apps
  * APIs
* Optimize models for:

  * Speed
  * Scalability
* Handle:

  * Monitoring
  * Retraining
  * Versioning
* Work with:

  * CI/CD pipelines
  * Distributed systems

## Required Skills

* Strong programming (Python + backend)
* Software engineering principles
* System design
* Model deployment
* MLOps concepts
* Cloud platforms
* Monitoring & maintenance

📌 *Best for developers who love production systems*

---

# Skill Comparison (High-Level)

| Skill              | Data Engineer | Data Analyst | Data Scientist | ML Engineer |
| ------------------ | ------------- | ------------ | -------------- | ----------- |
| Programming        | High          | Medium       | High           | High        |
| Statistics         | Low           | Medium       | High           | Medium      |
| ML Algorithms      | Low           | Low          | High           | Medium      |
| Business Knowledge | Low           | High         | High           | Medium      |
| Communication      | Medium        | High         | High           | Medium      |
| System Design      | High          | Low          | Medium         | High        |
| Data Storytelling  | No            | Yes          | Yes            | No          |

---

# Which Role Should You Choose?

* **Choose Data Engineer**
  If you love backend, systems, databases, infrastructure

* **Choose Data Analyst**
  If you love analysis, reporting, and business insights

* **Choose Data Scientist**
  If you want a **complete ML career** and enjoy math + ML + business

* **Choose ML Engineer**
  If you enjoy deploying models and production engineering

📌 *If confused → Start with Data Scientist*

---

## Final Advice

* Do NOT ask seniors or teachers blindly
* Go to **job portals**
* Read real job descriptions
* Identify required skills
* Learn **exactly what companies demand**

<br>
<br>

# Tensors in Machine Learning – Complete Notes (Beginner Friendly)

## Introduction

* In recent decades, Machine Learning has grown rapidly
* So far, we discussed:

  * **Why Machine Learning**
  * **What Machine Learning is**
* From now on, the focus is on **HOW Machine Learning works practically**
* Today’s topic is **Tensors**, which are **fundamental to ML & Deep Learning**

---

## Why Are Tensors Important?

* Almost all ML and DL libraries use tensors internally:

  * **NumPy**
  * **TensorFlow**
  * **PyTorch**
* You **cannot avoid tensors** while working in:

  * Machine Learning
  * Deep Learning
  * Computer Vision
  * NLP
* Even Google’s TensorFlow is named after **Tensor**
* Learning ML **without tensors is impossible**

---

## What Is a Tensor?

* **Tensor = Data Structure**
* Simply means **a way to store data**
* In practice, tensors mostly store **numbers**
* Very rarely used for characters or strings
* 99.99% of the time → **numeric data**

### Simple Analogy

* Tensor is like a **container**
* Container can hold:

  * One number
  * A list of numbers
  * Tables of numbers
  * Multi-dimensional numbers

---

## You Have Already Used Tensors!

* Scalar → Single number
* Vector → List of numbers
* Matrix → Table of numbers
* These are all **special cases of tensors**

| Name         | Example        | Tensor Dimension |
| ------------ | -------------- | ---------------- |
| Scalar       | 5              | 0D               |
| Vector       | [1, 2, 3]      | 1D               |
| Matrix       | [[1,2],[3,4]]  | 2D               |
| Higher Order | Images, Videos | 3D, 4D, 5D       |

---

## Tensor Dimensions (Rank / Axes)

* **Dimension = Number of axes**
* Also called:

  * Rank
  * Number of axes
* Example:

  * 1D tensor → 1 axis
  * 2D tensor → 2 axes
  * 3D tensor → 3 axes

> Dimension and axes are closely related

---

## Creating Tensors Using NumPy

* NumPy is heavily used in ML
* Creating tensors is simple using `np.array()`

### Scalar (0D Tensor)

* A single number
* Shape: `()`
* Size: 1

---

### Vector (1D Tensor)

* Collection of numbers
* Shape: `(n,)`
* Size: n

> In CS → Array
> In Math/Physics → Vector
> In ML → 1D Tensor


**Note**

[1,2,3,4]

Above is 1D tensor or Vector
- If we talk in term of tensor it has 1 dimension
- If we talk in term of vector it has 4 dimension


If we combine multiple scaler, then it becomes the vector or
> vector = Collection of scaler


---

### Matrix (2D Tensor)

[[1,2,3] , [4,5,6], [7,8,9]]


above is simply drawn as

```
 -         -
|  [1,2,3]   |
|  [4,5,6]   |
|  [7,8,9]   |
 -         -
```

* Collection of vectors
* Shape: `(rows, columns)`
* Two axes:

  * Rows
  * Columns

> Matrix = Collection of vectors

---

### Higher-Dimensional Tensors

* 3D tensor → Collection of matrices
* 4D tensor → Collection of 3D tensors
* 5D tensor → Collection of 4D tensors

> **Rule:**
> Higher dimension tensors are built by stacking lower dimension tensors

---

## Important Tensor Properties

### 1. Rank

No. of axis = No. of dimension = Rank

* Number of dimensions
* Example:

  * Vector → Rank 1
  * Matrix → Rank 2

---

### 2. Shape

* Size along each axis
* Example:

  * Shape `(3, 4)` → 3 rows, 4 columns

---

### 3. Size

* Total number of elements
* Calculated by multiplying shape values
* Example:

  * Shape `(3,4)` → Size = 12


Exception - for scalar, its size is 1 

---

## Tensor Representation in Machine Learning

### Tabular Data Example (Students Dataset)

* Columns:

  * CGPA
  * IQ
  * State
  * Placement (Target)
* Each row = **One student**
* Each row is a **1D tensor (vector)**
* All rows together = **2D tensor (matrix)**

### Key Insight

* One student → 1D tensor
* Entire dataset → 2D tensor

---

## Important ML Concept

* **Input features** → Stored as matrix (2D tensor)
* **Target/output** → Stored as vector (1D tensor)

---

## NLP (Text Data) & Tensors

* ML algorithms **cannot understand text**
* Text must be converted into **numbers**
* Process is called **Vectorization**
* Each word → Vector
* Sentence → Collection of vectors (2D tensor)
* Multiple sentences → 3D tensor

---

## Time Series Data

* Data collected over time
* Examples:

  * Stock prices
  * Weather data
* Shape:

  * `(time_steps, features)` → 2D
  * `(samples, time_steps, features)` → 3D

---

## Image Data & Tensors

* Image = Collection of pixels
* Pixel values are numbers
* Grayscale image:

  * Shape `(height, width)`
* Color image (RGB):

  * Shape `(height, width, 3)`
* Image dataset:

  * `(number_of_images, height, width, channels)` → 4D tensor

---

## Video Data & Tensors

* Video = Collection of images (frames)
* Video tensor shape:

  * `(videos, frames, height, width, channels)` → 5D tensor
* Video data is **huge**
* Requires:

  * Compression
  * Efficient storage
  * Optimized processing

---

## Why Higher-Dimensional Tensors Matter

* Used in:

  * Computer Vision
  * NLP
  * Speech Recognition
  * Video Processing
* Deep Learning models operate on:

  * 3D, 4D, 5D tensors regularly

---

## Final Summary

* Tensor is the **foundation of ML & DL**
* Everything in ML is eventually converted into tensors
* Understanding tensors helps you:

  * Read ML code confidently
  * Understand model inputs & outputs
  * Work with real-world data
* If you understand tensors:

  * ML becomes much easier



