document.addEventListener('DOMContentLoaded', function() {
    
    var toggleBtn = document.getElementById('theme-toggle');
    var body = document.body;
    var icon = toggleBtn.querySelector('i');

    var currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(currentTheme);
        if (currentTheme === 'dark-mode') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    toggleBtn.addEventListener('click', function() {
        body.classList.toggle('dark-mode');

        var theme = 'light';
        if (body.classList.contains('dark-mode')) {
            theme = 'dark-mode';
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
        localStorage.setItem('theme', theme);
        updateChartsForTheme();
    });

    var monthlyData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        income: [8000, 9500, 7800, 10000, 8500, 9000, 11000, 9800, 10500, 8800, 9200, 10000],
        expense: [5500, 6200, 5800, 7000, 6000, 5500, 7200, 6800, 7000, 5900, 6100, 7000]
    };

    var expenseCategories = {
        labels: ['Food', 'Health', 'Shopping', 'Entertainment', 'Others'],
        values: [978, 534.20, 1038.23, 345.03, 276.89],
        colors: ['#ff6b6b', '#4ecdc4', '#ffd93d', '#6c5ce7', '#a8a8a8']
    };

    var barChartCanvas = document.getElementById('bar-chart');
    var barChart = null;

    function createBarChart() {
        var ctx = barChartCanvas.getContext('2d');
        var isDarkMode = body.classList.contains('dark-mode');
        var textColor = isDarkMode ? '#f3f4f6' : '#212c3e';
        var gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

        barChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: monthlyData.labels,
                datasets: [
                    {
                        label: 'Income',
                        data: monthlyData.income,
                        backgroundColor: 'rgba(34, 197, 94, 0.8)',
                        borderColor: 'rgba(34, 197, 94, 1)',
                        borderWidth: 1,
                        borderRadius: 6,
                        borderSkipped: false
                    },
                    {
                        label: 'Expense',
                        data: monthlyData.expense,
                        backgroundColor: 'rgba(249, 115, 22, 0.8)',
                        borderColor: 'rgba(249, 115, 22, 1)',
                        borderWidth: 1,
                        borderRadius: 6,
                        borderSkipped: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: isDarkMode ? '#1e293b' : 'white',
                        titleColor: textColor,
                        bodyColor: textColor,
                        borderColor: isDarkMode ? '#374151' : '#e3e8f0',
                        borderWidth: 1,
                        padding: 12,
                        cornerRadius: 8,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ₹' + context.raw.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: textColor,
                            font: {
                                weight: '500'
                            }
                        }
                    },
                    y: {
                        grid: {
                            color: gridColor
                        },
                        ticks: {
                            color: textColor,
                            callback: function(value) {
                                return '₹' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    var pieChartCanvas = document.getElementById('pie-chart');
    var pieChart = null;

    function createPieChart() {
        var ctx = pieChartCanvas.getContext('2d');
        var isDarkMode = body.classList.contains('dark-mode');
        var textColor = isDarkMode ? '#f3f4f6' : '#212c3e';

        pieChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: expenseCategories.labels,
                datasets: [{
                    data: expenseCategories.values,
                    backgroundColor: expenseCategories.colors,
                    borderColor: isDarkMode ? '#1e293b' : 'white',
                    borderWidth: 3,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                cutout: '60%',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: isDarkMode ? '#1e293b' : 'white',
                        titleColor: textColor,
                        bodyColor: textColor,
                        borderColor: isDarkMode ? '#374151' : '#e3e8f0',
                        borderWidth: 1,
                        padding: 12,
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                var total = context.dataset.data.reduce(function(a, b) { return a + b; }, 0);
                                var percentage = ((context.raw / total) * 100).toFixed(1);
                                return context.label + ': ₹' + context.raw.toFixed(2) + ' (' + percentage + '%)';
                            }
                        }
                    }
                }
            }
        });
    }

    function updateChartsForTheme() {
        if (barChart) {
            barChart.destroy();
        }
        if (pieChart) {
            pieChart.destroy();
        }
        createBarChart();
        createPieChart();
    }

    createBarChart();
    createPieChart();

    var transactions = [
        { date: 'Jan 25 2025', category: 'Health', amount: 500.00, status: 'Success', description: 'Medical checkup' },
        { date: 'Feb 5 2025', category: 'Shopping', amount: 800.00, status: 'Success', description: 'Clothes purchase' },
        { date: 'Feb 12 2025', category: 'Food', amount: 300.00, status: 'Success', description: 'Restaurant dinner' },
        { date: 'Mar 1 2025', category: 'Entertainment', amount: 450.00, status: 'Success', description: 'Movie tickets' },
        { date: 'Mar 15 2025', category: 'Others', amount: 200.00, status: 'Success', description: 'Miscellaneous' }
    ];

    var exportBtn = document.getElementById('export-btn');

    function convertToCSV(data) {
        var headers = ['Date', 'Category', 'Amount', 'Status', 'Description'];
        var csvRows = [];
        
        csvRows.push(headers.join(','));
        
        for (var i = 0; i < data.length; i++) {
            var row = data[i];
            var values = [
                row.date,
                row.category,
                row.amount.toFixed(2),
                row.status,
                '"' + row.description + '"'
            ];
            csvRows.push(values.join(','));
        }
        
        return csvRows.join('\n');
    }

    function downloadCSV(csvContent, filename) {
        var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        var link = document.createElement('a');
        
        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, filename);
        } else {
            var url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
    }

    exportBtn.addEventListener('click', function() {
        var csvContent = convertToCSV(transactions);
        var today = new Date();
        var dateStr = today.getFullYear() + '-' + 
                     String(today.getMonth() + 1).padStart(2, '0') + '-' + 
                     String(today.getDate()).padStart(2, '0');
        var filename = 'MoneyMaster_Transactions_' + dateStr + '.csv';
        
        downloadCSV(csvContent, filename);
    });

    var modalOverlay = document.getElementById('modal-overlay');
    var modalClose = document.getElementById('modal-close');
    var addTransactionBtn = document.getElementById('add-transaction-btn');
    var removeTransactionBtn = document.getElementById('remove-transaction-btn');
    var transactionForm = document.getElementById('transaction-form');
    var transactionsBody = document.getElementById('transactions-body');

    function openModal() {
        modalOverlay.classList.add('active');
        var today = new Date().toISOString().split('T')[0];
        document.getElementById('trans-date').value = today;
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        transactionForm.reset();
    }

    addTransactionBtn.addEventListener('click', function() {
        openModal();
    });

    modalClose.addEventListener('click', function() {
        closeModal();
    });

    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    function formatDate(dateString) {
        var date = new Date(dateString);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getFullYear();
    }

    function addTransactionToTable(transaction) {
        var row = document.createElement('tr');
        row.innerHTML = '<td>' + transaction.date + '</td>' +
                        '<td>' + transaction.category + '</td>' +
                        '<td>₹' + transaction.amount.toFixed(2) + '</td>' +
                        '<td><span class="status-success">Success</span></td>' +
                        '<td>' + transaction.description + '</td>';
        transactionsBody.appendChild(row);
    }

    transactionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        var dateInput = document.getElementById('trans-date').value;
        var category = document.getElementById('trans-category').value;
        var amount = parseFloat(document.getElementById('trans-amount').value);
        var description = document.getElementById('trans-description').value;
        
        var newTransaction = {
            date: formatDate(dateInput),
            category: category,
            amount: amount,
            status: 'Success',
            description: description
        };
        
        transactions.push(newTransaction);
        addTransactionToTable(newTransaction);
        closeModal();
    });

    removeTransactionBtn.addEventListener('click', function() {
        if (transactions.length > 0) {
            transactions.pop();
            var rows = transactionsBody.querySelectorAll('tr');
            if (rows.length > 0) {
                transactionsBody.removeChild(rows[rows.length - 1]);
            }
        }
    });

    var navbarDate = document.getElementById('navbar-date');
    var today = new Date().toISOString().split('T')[0];
    navbarDate.value = today;

});
